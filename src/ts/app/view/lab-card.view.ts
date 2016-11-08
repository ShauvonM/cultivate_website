import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import moment = require('moment');

import { Lab, LabService } from "../service/lab.service";
import { Person, TeamService } from "../service/team.service";

@Component({
    moduleId: module.id,
    selector: '.lab-card',
    templateUrl: '../template/lab-card.view.html'
})
export class LabCardView implements OnInit {

    @Input() lab: Lab;
    teacher: Person;

    sessionString: string;

    constructor(
        private labService: LabService,
        private teamService: TeamService
    ) {}

    ngOnInit(): void {
        this.teamService.getPerson(this.lab.teacherKey)
            .then(teacher => this.teacher = teacher);

        this.getSimpleDate();

        window['moment'] = moment;
    }

    getSimpleDate(): void {
        if (this.lab.repeatType) {
            // it repeats, so we'll show the number of whatevers that repeat

            let sessionString: string;
            if (this.lab.sessionCount) {
                sessionString = this.lab.sessionCount + " ";
                // TODO: move these switch statements into some sort of util class, or on the lab service
                switch(this.lab.repeatType) {
                    case 1: // daily
                        if (!this.lab.sessionCount) {
                            sessionString = "Every day";
                        } else {
                            sessionString += "days"
                        }
                        break;
                    case 2: // weekly
                        sessionString += "weeks";
                        break;
                    case 3: // monthly by day
                    case 4: // monthly by week
                        sessionString += "months";
                        break;
                    case 5: // yearly
                        sessionString += "years";
                        break;
                }
            } else {
                sessionString = "Every ";
                switch(this.lab.repeatType) {
                    case 1: // daily
                        sessionString += "day"
                        break;
                    case 2: // weekly
                        sessionString += "week";
                        break;
                    case 3: // monthly by day
                    case 4: // monthly by week
                        sessionString += "month";
                        break;
                    case 5: // yearly
                        sessionString += "year";
                        break;
                }
            }

            this.sessionString = sessionString;

        } else {

            if (this.lab.dates.length == 1) {
                // single session!
                let date = this.lab.dates[0];
                let time = this.lab.times[0];
                let duration = this.lab.durations[0];

                let utcTime = date + "T" + time;

                let startTime = moment(utcTime);
                let endTime = startTime.clone().add(duration, "m");

                this.sessionString = startTime.format("MMMM Do, h:mm a") + " - " + endTime.format("h:mm a");
            } else {
                // multi session! this is handled directly in the template
            }

        }
    }

/*
    getDateStuff(): void {
        this.dates = [];
        this.time = "";

        if (this.lab.repeatType) {
            // repeats!
            let repeatInterval: string;

            let date = this.lab.dates[0];
            let time = this.lab.times[0];
            let duration = this.lab.durations[0];

            let utcTime = date + "T" + time;

            let startTime = moment(utcTime);

            if (!this.lab.repeatInterval || this.lab.repeatInterval == 1) {
                repeatInterval = "every";
            } else if (this.lab.repeatInterval == 2) {
                repeatInterval = "every other";
            } else {
                repeatInterval = "every " + this.lab.repeatInterval + "th"; // FIXME: 3rd
            }

            // TODO: make this an enum?
            switch(this.lab.repeatType) {
                case 1:
                    this.repeatString = repeatInterval + " day"
                    break;
                case 2:
                    this.repeatString = repeatInterval + " " + startTime.format("dddd");
                    break;
                case 3:
                    this.repeatString = "the " + startTime.format("Do") + " of " + repeatInterval + " month";
                    break;
                case 4:
                    let nthWeekOfMonth = Math.ceil(startTime.get("date") / 7);

                    this.repeatString = "the " + nthWeekOfMonth + " " + startTime.format("Do") + " of " + repeatInterval + " month";
                    break;
                case 5:
                    this.repeatString = repeatInterval + " year on " + startTime.format("MMMM do");
                    break;
            }

        } else {
            // doesn't repeat!

            // sort through all the dates
            for(let i = 0; i < this.lab.dates.length; i++) {
                let date = this.lab.dates[i];
                let time = this.lab.times[i] ? this.lab.times[i] : this.lab.times[0];
                let duration = this.lab.durations[i] ? this.lab.durations[i] : this.lab.durations[0];

                let utcTime = date + "T" + time;

                let startTime = moment(utcTime);
                let dateString = startTime.format("MMMM Do");

                let endTime = startTime.clone().add(duration, "m");
                if (this.lab.times.length == 1 && !this.time) {
                    this.time = startTime.format("h:mm a") + " to " + endTime.format("h:mm a");
                } else {
                    dateString += " " + startTime.format("h:mm a") + " - " + endTime.format("h:mm a");
                }

                this.dates.push(dateString);
            }
        }

    }
    */
}