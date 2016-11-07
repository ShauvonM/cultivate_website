import { Injectable } from '@angular/core';

import { TEAM } from '../data/team.data';

export class Person {
    key: string;
    firstName: string;
    lastName: string;
    title?: string;
    founder?: boolean;
    headshotUrl?: string;
    bio: string;
    website?: string;
    email?: string;
    phone?: number;
    inactive?: boolean;
}

@Injectable()
export class TeamService {
    private people: Person[] = [];

    constructor() { }

    private _teamPromise: Promise<Person[]>;
    getTeam(): Promise<Person[]> {
        if (!this._teamPromise) {
            this._teamPromise = Promise.resolve(TEAM);
        }
        return this._teamPromise;
    }

    getFounders(): Promise<Person[]> {
        return new Promise<Person[]>((resolve, reject) => {
            this.getTeam().then((team) => {
                let founders: Person[] = [];
                team.forEach((person) => {
                    if (person.founder && !person.inactive) {
                        founders.push(person);
                    }
                });
                resolve(founders);
            });
        });
    }

    getTeachers(): Promise<Person[]> {
        return new Promise<Person[]>((resolve, reject) => {
            this.getTeam().then((team) => {
                let teachers: Person[] = [];
                team.forEach((person) => {
                    if (!person.founder && !person.inactive) {
                        teachers.push(person);
                    }
                });
                resolve(teachers);
            });
        });
    }

    getPerson(key: string): Promise<Person> {
        return new Promise<Person>((resolve, reject) => {
            this.getTeam().then((team) => {
                team.forEach((person) => {
                    if (person.key == key) {
                        resolve(person);
                    }
                })
            })
        })
    }

}