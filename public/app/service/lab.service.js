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
var labs_data_1 = require('../data/labs.data');
var team_service_1 = require('./team.service');
var date_utils_1 = require('../util/date.utils');
var Lab = (function () {
    function Lab() {
    }
    return Lab;
}());
exports.Lab = Lab;
/**
 * Repeat types:
 * 0 - does not repeat
 * 1 - daily            (every day)
 * 2 - weekly           (ex. every Wednesday)
 * 3 - monthly by day   (ex. the 1st of every month)
 * 4 - monthly by week  (ex. the last monday of every month)
 * 5 - yearly
 */
var LabService = (function () {
    function LabService(teamService) {
        this.teamService = teamService;
        this.labs = [];
    }
    LabService.prototype.getLabs = function (format) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._getLabs().then(function (labs) {
                var classes = [];
                _this.labs.forEach(function (lab) {
                    // TODO: make this an enum?
                    if ((format == "all" || lab.format == format)
                        && !lab.inactive) {
                        classes.push(lab);
                    }
                });
                classes.sort(function (lab1, lab2) {
                    var val1 = lab1.dates[0];
                    var val2 = lab2.dates[0];
                    if (val1 > val2) {
                        return 1;
                    }
                    if (val1 < val2) {
                        return -1;
                    }
                    return 0;
                });
                resolve(classes);
            });
        });
    };
    LabService.prototype._getLabs = function () {
        var _this = this;
        if (!this._labPromise) {
            this._labPromise = new Promise(function (resolve, reject) {
                _this.labs = labs_data_1.LABS;
                resolve(_this.labs);
            });
        }
        return this._labPromise;
    };
    LabService.prototype.getLabsForDate = function (date) {
        var _this = this;
        var dateLabs = [];
        this.labs.forEach(function (lab) {
            // do a bit of searching just to see if we even need to check the dates
            if (lab.repeatType) {
                if (date.isBefore(date_utils_1.default.getStartMomentForLab(lab), 'day')) {
                    // it starts in the future, so we can skip it
                    return true; // this skips to the next item in the foreEach
                }
                else if (lab.sessionCount && date.isAfter(date_utils_1.default.getEndMomentForLab(lab), 'day')) {
                    // the lab ended in the past, so we can skip it
                    return true;
                }
            }
            if (_this.isLabOnDate(lab, date)) {
                dateLabs.push(lab);
            }
        });
        return dateLabs;
    };
    LabService.prototype.isLabOnDate = function (lab, date) {
        if (lab.repeatType && !lab.sessionCount) {
            var startMoment = date_utils_1.default.getStartMomentForLab(lab);
            if (date.isBefore(startMoment, "day")) {
                return false;
            }
            // if it's an endless repeat, we can just check it against the day it regularly happens
            switch (lab.repeatType) {
                case 1:
                    // it happens every day, so yes it happens today
                    return true;
                case 2:
                    return date_utils_1.default.getStartMomentForLab(lab).day() == date.day();
                case 3:
                    return date_utils_1.default.getStartMomentForLab(lab).date() == date.date();
                case 4:
                    var weekInMonth = date_utils_1.default.getWeekInMonth(startMoment);
                    var dayInWeek = startMoment.day();
                    return date_utils_1.default.getWeekInMonth(date) == weekInMonth
                        && date.day() == dayInWeek;
                case 5:
                    return startMoment.format("MM-DD") == date.format("MM-DD");
            }
        }
        else {
            return date_utils_1.default.getAllDatesForLab(lab).indexOf(date_utils_1.default.getISODate(date)) > -1;
        }
    };
    LabService.prototype.getLab = function (uuid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getLabs("all").then(function (labs) {
                labs.forEach(function (lab) {
                    if (lab.uuid == uuid) {
                        resolve(lab);
                    }
                });
            });
        });
    };
    LabService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [team_service_1.TeamService])
    ], LabService);
    return LabService;
}());
exports.LabService = LabService;

//# sourceMappingURL=lab.service.js.map
