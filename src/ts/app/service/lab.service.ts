import { Injectable } from '@angular/core';

import { LABS } from '../data/labs.data';
import { Person, TeamService } from './team.service';

export class Lab {
    uuid: string;
    name: string;
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

    price: number; // USD

    // TODO: do we need a SKU or something for purchasing?

    blurb: string;
    description: string;
    
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
    repeatInterval?: number; // every [interval] days, weeks, etc (0 is treated as 'every')
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
                if (format == "all") {
                    classes = this.labs;
                } else {
                    this.labs.forEach(lab => {
                        // TODO: make this an enum?
                        if (lab.format == format) {
                            classes.push(lab);
                        }
                    });
                }
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