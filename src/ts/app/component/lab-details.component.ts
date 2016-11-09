import {
    Component,
    OnInit
} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }   from '@angular/common';

import moment = require('moment');

import { AppComponent } from "./app.component";
import { Person, TeamService } from "../service/team.service";
import { Lab, LabService } from "../service/lab.service";

import DateUtils from "../util/date.utils";

@Component({
    moduleId: module.id,
    selector: 'cultivate-lab',
    templateUrl: '../template/lab-details.component.html'
})
export class LabDetailsComponent implements OnInit {

    scrollpos: number;

    lab: Lab;
    teacher: Person;

    dates: string[] = [];
    time: string;
    repeatString: string;

    constructor(
        private _app: AppComponent,
        private route: ActivatedRoute,
        private location: Location,
        private teamService: TeamService,
        private labService: LabService
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let uuid = params['uuid'];
            this.getLab(uuid);
        });
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }

    getLab(uuid: string): void {
        this.labService.getLab(uuid).then(lab => {
            this.lab = lab
            this.getTeacher();
            this.getFullDateInfo();
        });
    }

    getTeacher(): void {
        if (!this.lab) {
            return;
        }
        this.teamService.getPerson(this.lab.teacherKey)
            .then((person) => this.teacher = person);
    }

    goBack(): void {
        this.location.back();
    }

    getFullDateInfo(): void {
        this.dates = [];
        this.time = "";

        if (this.lab.repeatType) {
            // repeats!
            let repeatInterval: string;

            let date = this.lab.dates[0];
            let time = this.lab.times[0];
            let duration = this.lab.durations[0];

            let utcTime = date + "T" + time;

            //let startTime = moment(utcTime);

            this.repeatString = DateUtils.getRepeatString(this.lab);

            if (this.lab.sessionCount) {
                // get start and end dates
                this.dates.push(DateUtils.getStartToEndDateString(this.lab));
            }

            //this.time = DateUtils.getStartToEndTimeString(startTime, startTime.clone().add(duration, "m"));
            this.time = DateUtils.getStartToEndTimeString(this.lab);

        } else {
            // doesn't repeat!

            // sort through all the dates
            for(let i = 0; i < this.lab.dates.length; i++) {
                let date = this.lab.dates[i];
                let time = this.lab.times[i] ? this.lab.times[i] : this.lab.times[0];
                let duration = this.lab.durations[i] ? this.lab.durations[i] : this.lab.durations[0];

                let utcTime = date + "T" + time;

                let startTime = moment(utcTime);
                let dateString = DateUtils.getDateString(startTime);

                //let endTime = startTime.clone().add(duration, "m");
                if (this.lab.times.length == 1 && !this.time) {
                    // each date has the same time
                    //this.time = DateUtils.getStartToEndTimeString(startTime, endTime);
                    this.time = DateUtils.getStartToEndTimeString(this.lab);
                } else {
                    // each date has its own time
                    //dateString += "<br /> " + DateUtils.getStartToEndTimeString(startTime, endTime);
                    dateString += "<br /> " + DateUtils.getStartToEndTimeString(this.lab, i);
                }

                this.dates.push(dateString);
            }
        }

    }
}