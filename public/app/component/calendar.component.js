"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var moment = require('moment');
var app_component_1 = require("./app.component");
var lab_service_1 = require("../service/lab.service");
var date_utils_1 = require("../util/date.utils");
var DateInfo = (function () {
    function DateInfo() {
    }
    return DateInfo;
}());
var CalendarComponent = (function () {
    function CalendarComponent(_app, router, labService) {
        this._app = _app;
        this.router = router;
        this.labService = labService;
    }
    CalendarComponent.prototype.ngOnInit = function () {
        // TODO: collapse labs if there are more than three in a day
        var _this = this;
        this.today = moment();
        this.date = this.today.clone().set("date", 1);
        this.labService.getLabs("all")
            .then(function (labs) {
            _this.setupCalendar();
        });
    };
    CalendarComponent.prototype.onScroll = function (scrollpos) {
        this.scrollpos = scrollpos;
    };
    CalendarComponent.prototype.prevMonth = function () {
        this.date.subtract("M", 1);
        this.setupCalendar();
    };
    CalendarComponent.prototype.nextMonth = function () {
        this.date.add("M", 1);
        this.setupCalendar();
    };
    CalendarComponent.prototype.clickDay = function (day) {
        if (day && day.date) {
            this.selectedDate = day;
            var selectedMoment = this.date.clone().set("date", day.date);
            this.selectedDateString = date_utils_1.default.getDateString(selectedMoment, true);
            this.selectedDateISO = date_utils_1.default.getISODate(selectedMoment);
        }
        else {
            this.selectedDate = null;
            this.selectedDateISO = null;
            this.selectedDateString = null;
        }
    };
    CalendarComponent.prototype.clickLab = function (lab) {
        if (!this._app.isMobile()) {
            this.clickLabInfo(lab);
        }
    };
    CalendarComponent.prototype.clickLabInfo = function (lab) {
        this.router.navigate(['/classes/', lab.uuid]);
    };
    CalendarComponent.prototype.getShortTimeString = function (lab) {
        return date_utils_1.default.getShortTimeForLab(lab);
    };
    CalendarComponent.prototype.setupCalendar = function () {
        this.clickDay(null);
        this.month = this.date.format(date_utils_1.default.MONTH_YEAR);
        var dateDay = parseInt(this.date.format('d'));
        this.dateInfo = [[]];
        this.dateInfo[0] = [];
        for (var day = 0; day < dateDay; day++) {
            this.dateInfo[0].push({
                date: 0
            });
        }
        var week = 0;
        for (var day = 1; day <= this.date.daysInMonth(); day++) {
            var thisDateInfo = {
                date: day,
                today: this.date.get('M') == this.today.get('M') && day == this.today.get('date'),
                labs: this.labService.getLabsForDate(this.date.clone().set("date", day))
            };
            if (thisDateInfo.today) {
                this.clickDay(thisDateInfo);
            }
            this.dateInfo[week].push(thisDateInfo);
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
    };
    CalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cultivate-calendar',
            templateUrl: '../template/calendar.component.html'
        }), 
        __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.Router, lab_service_1.LabService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;

//# sourceMappingURL=calendar.component.js.map
