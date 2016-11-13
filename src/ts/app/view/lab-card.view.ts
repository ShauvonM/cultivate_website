import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import moment = require('moment');

import { Lab, LabService } from "../service/lab.service";
import { Person, TeamService } from "../service/team.service";

import DateUtils from "../util/date.utils";

@Component({
    moduleId: module.id,
    selector: '.lab-card',
    templateUrl: '../template/lab-card.view.html'
})
export class LabCardView implements OnInit {

    @Input() lab: Lab;
    @Input() date: string;
    teacher: Person;

    sessionString: string;

    constructor(
        private labService: LabService,
        private teamService: TeamService
    ) {}

    ngOnInit(): void {
        this.teamService.getPerson(this.lab.teacherKey)
            .then(teacher => this.teacher = teacher);

        if (this.date) {
            this.getTime()
        } else {
            this.getSimpleDate();
        }

        window['moment'] = moment;
    }

    getTime(): void {
        let index = this.lab.dates.indexOf(this.date);
        if (index < 0) {
            index = 0;
        }
        this.sessionString = DateUtils.getStartToEndTimeString(this.lab, index);
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
    */
}