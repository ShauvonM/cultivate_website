import { Injectable } from '@angular/core';

//import { TEAM } from '../data/team.data';

export class Lab {
    uuid: string;
    name: string;

    date?: string;
    dates?: string[];

    time: string;
    duration: number;
    price: number;
    blurb: string;
    description: string;
    location: string;

    teacherKey: string;
    theme: string;
    // TODO: add tags

    image?: string;

    spaces: number;
    spacesSold: number;

    repeatType?: number; // see below
    repeatCount?: number; // 0 for indefinite
    repeatInterval?: number; // every [interval] days, weeks, etc
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

    constructor() { }

    private _labPromise: Promise<Lab[]>;
    getLabs(): Promise<Lab[]> {
        if (!this._labPromise) {
            //this._labPromise = Promise.resolve(TEAM);
        }
        return this._labPromise;
    }

    getLab(uuid: string): Promise<Lab> {
        return new Promise<Lab>((resolve, reject) => {
            this.getLabs().then((labs) => {
                labs.forEach((lab) => {
                    if (lab.uuid == uuid) {
                        resolve(lab);
                    }
                })
            })
        })
    }

}