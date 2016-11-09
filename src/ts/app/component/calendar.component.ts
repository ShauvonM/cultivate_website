import {
    Component,
    OnInit
} from '@angular/core';
import { Router }   from '@angular/router';

import moment = require('moment');

import { AppComponent } from "./app.component";

import { Lab, LabService } from "../service/lab.service";
import DateUtils from "../util/date.utils";

class DateInfo {
    date: number;
    today?: boolean;
    labs?: Lab[];
}

@Component({
    moduleId: module.id,
    selector: 'cultivate-calendar',
    templateUrl: '../template/calendar.component.html'
})
export class CalendarComponent implements OnInit {

    scrollpos: number;

    date: moment.Moment;
    today: moment.Moment;
    dateInfo: [DateInfo[]];

    month: string;

    constructor(
        private _app: AppComponent,
        private router: Router,
        private labService: LabService
    ) {}

    ngOnInit(): void {
        this.today = moment();
        this.date = this.today.clone().set("date", 1);
        this.labService.getLabs("all")
            .then((labs) => {
                this.setupCalendar();
            });
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }

    prevMonth(): void {
        this.date.subtract("M", 1);
        this.setupCalendar();
    }

    nextMonth(): void {
        this.date.add("M", 1);
        this.setupCalendar();
    }

    clickLab(lab: Lab): void {
        this.router.navigate(['/classes', lab.uuid]);
    }

    getShortTimeString(lab: Lab): string {
        return DateUtils.getShortTimeForLab(lab);
    }

    setupCalendar(): void {
        this.month = this.date.format(DateUtils.MONTH_YEAR);

        let dateDay:number = parseInt(this.date.format('d'));
        this.dateInfo = [[]];
        this.dateInfo[0] = [];
        for (let day = 0; day < dateDay; day++) {
            this.dateInfo[0].push({
                date: 0
            });
        }
        
        let week = 0;
        for (let day = 1; day <= this.date.daysInMonth(); day++) {
            this.dateInfo[week].push({
                date: day,
                today: this.date.get('M') == this.today.get('M') && day == this.today.get('date'),
                labs: this.labService.getLabsForDate(this.date.clone().set("date", day))
            });

            dateDay++;
            if (day < this.date.daysInMonth()) {
                if (dateDay >= 7) {
                    dateDay = 0;
                    week++;
                    this.dateInfo[week] = [];
                }
            }
        }

        // finish out the week
        while (dateDay < 7) {
            this.dateInfo[week].push({
                date: 0
            });
            dateDay++;
        }
    }
}