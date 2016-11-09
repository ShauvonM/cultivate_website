import { Injectable } from '@angular/core';

import moment = require('moment');

import { LABS } from '../data/labs.data';
import { Person, TeamService } from './team.service';
import DateUtils from '../util/date.utils';

export class Lab {
    uuid: string;
    name: string;

    inactive?: boolean;

    format: string; // what sort of event this is, i.e. "class" "drop-in" "meet-up"

    dates: string[]; // ISO 8601 - '2016-11-07'
    times: string[]; // ISO 8601, include timezone - '17:30:00-500' is 5:30 PM Eastern
    durations: number[]; // in minutes
    // these things are arrays, in case this item repeats irregularly
    // they should be the same length - if there are multiple dates and only one time and duration,
    // we can assume that this event is the same time and duration on each date

    // I'm pretty sure that if these arrays are bigger than one, the repeatType needs to be 0 (or not set)

    // note that the intention here is not for multiple offerings of the same one-off class, 
    //  but multiple sessions of a single class that happen on different days or times

    price?: number; // USD

    // TODO: do we need a SKU or something for purchasing?

    blurb: string;
    description: string;
    icon?: string;
    
    location?: string; // leave blank to default to "The Studio"

    teacherKey: string;

    // TODO: add tags
    // TODO: a "theme" field?
    // TODO: a "who is this for" field?

    image?: string;

    spaces?: number; // number of seats total
    minSpaces?: number; // number required to go
    spacesSold?: number; // number of seats sold

    repeatType?: number; // see below
    sessionCount?: number; // total number of sessions - if repeatType is set, 0 is indefinite
    repeatInterval?: number; // every [interval] days, weeks, etc (0 or 1 are treated as 'every')
}

/**
 * Repeat types:
 * 0 - does not repeat
 * 1 - daily            (every day)
 * 2 - weekly           (ex. every Wednesday)
 * 3 - monthly by day   (ex. the 1st of every month)
 * 4 - monthly by week  (ex. the last monday of every month)
 * 5 - yearly
 */

@Injectable()
export class LabService {
    private labs: Lab[] = [];

    constructor(
        private teamService: TeamService
    ) { }

    getLabs(format: string): Promise<Lab[]> {
        return new Promise<Lab[]>((resolve, reject) => {
            this._getLabs().then((labs) => {
                let classes: Lab[] = [];
                this.labs.forEach(lab => {
                    // TODO: make this an enum?
                    if ((format == "all" || lab.format == format)
                        && !lab.inactive) {

                        classes.push(lab);
                    }
                });
                classes.sort((lab1, lab2) => {
                    let val1 = lab1.dates[0];
                    let val2 = lab2.dates[0];
                    if (val1 > val2) {
                        return 1;
                    }
                    if (val1 < val2) {
                        return -1;
                    }
                    return 0;
                });
                resolve(classes);
            })
        })
    }

    private _labPromise: Promise<Lab[]>;
    private _getLabs(): Promise<Lab[]> {
        if (!this._labPromise) {
            this._labPromise = new Promise<Lab[]>((resolve, reject) => {
                this.labs = LABS;
                resolve(this.labs);
            });
        }
        return this._labPromise;
    }

    getLabsForDate(date: moment.Moment): Lab[] {
        let dateLabs: Lab[] = [];
        this.labs.forEach((lab) => {
            // do a bit of searching just to see if we even need to check the dates
            if (lab.repeatType) {
                if (date.isBefore(DateUtils.getStartMomentForLab(lab), 'day')) {
                    // it starts in the future, so we can skip it
                    return true; // this skips to the next item in the foreEach
                } else if (lab.sessionCount && date.isAfter(DateUtils.getEndMomentForLab(lab), 'day')) {
                    // the lab ended in the past, so we can skip it
                    return true;
                }
            }

            if (this.isLabOnDate(lab, date)) {
                dateLabs.push(lab);
            }
        });
        return dateLabs;
    }

    isLabOnDate (lab: Lab, date: moment.Moment): boolean {
        if (lab.repeatType && !lab.sessionCount) {
            let startMoment = DateUtils.getStartMomentForLab(lab);
            if (date.isBefore(startMoment, "day")) {
                return false;
            }

            // if it's an endless repeat, we can just check it against the day it regularly happens
            switch (lab.repeatType) {
                case 1: // daily
                    // it happens every day, so yes it happens today
                    return true;
                case 2: // weekly
                    return DateUtils.getStartMomentForLab(lab).day() == date.day();
                case 3: // monthly by day
                    return DateUtils.getStartMomentForLab(lab).date() == date.date();
                case 4: // monthly by week
                    let weekInMonth = DateUtils.getWeekInMonth(startMoment);
                    let dayInWeek = startMoment.day();
                    return DateUtils.getWeekInMonth(date) == weekInMonth
                        && date.day() == dayInWeek;
                case 5: // annual
                    return startMoment.format("MM-DD") == date.format("MM-DD");
            }
        } else {
            return DateUtils.getAllDatesForLab(lab).indexOf(DateUtils.getISODate(date)) > -1;
        }
    }

    getLab(uuid: string): Promise<Lab> {
        return new Promise<Lab>((resolve, reject) => {
            this.getLabs("all").then((labs) => {
                labs.forEach((lab) => {
                    if (lab.uuid == uuid) {
                        resolve(lab);
                    }
                })
            })
        })
    }

}