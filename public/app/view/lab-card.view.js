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
var moment = require('moment');
var lab_service_1 = require("../service/lab.service");
var team_service_1 = require("../service/team.service");
var LabCardView = (function () {
    function LabCardView(labService, teamService) {
        this.labService = labService;
        this.teamService = teamService;
    }
    LabCardView.prototype.ngOnInit = function () {
        var _this = this;
        this.teamService.getPerson(this.lab.teacherKey)
            .then(function (teacher) { return _this.teacher = teacher; });
        this.getSimpleDate();
        window['moment'] = moment;
    };
    LabCardView.prototype.getSimpleDate = function () {
        if (this.lab.repeatType) {
            // it repeats, so we'll show the number of whatevers that repeat
            var sessionString = void 0;
            if (this.lab.sessionCount) {
                sessionString = this.lab.sessionCount + " ";
                // TODO: move these switch statements into some sort of util class, or on the lab service
                switch (this.lab.repeatType) {
                    case 1:
                        if (!this.lab.sessionCount) {
                            sessionString = "Every day";
                        }
                        else {
                            sessionString += "days";
                        }
                        break;
                    case 2:
                        sessionString += "weeks";
                        break;
                    case 3: // monthly by day
                    case 4:
                        sessionString += "months";
                        break;
                    case 5:
                        sessionString += "years";
                        break;
                }
            }
            else {
                sessionString = "Every ";
                switch (this.lab.repeatType) {
                    case 1:
                        sessionString += "day";
                        break;
                    case 2:
                        sessionString += "week";
                        break;
                    case 3: // monthly by day
                    case 4:
                        sessionString += "month";
                        break;
                    case 5:
                        sessionString += "year";
                        break;
                }
            }
            this.sessionString = sessionString;
        }
        else {
            if (this.lab.dates.length == 1) {
                // single session!
                var date = this.lab.dates[0];
                var time = this.lab.times[0];
                var duration = this.lab.durations[0];
                var utcTime = date + "T" + time;
                var startTime = moment(utcTime);
                var endTime = startTime.clone().add(duration, "m");
                this.sessionString = startTime.format("MMMM Do, h:mm a") + " - " + endTime.format("h:mm a");
            }
            else {
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', lab_service_1.Lab)
    ], LabCardView.prototype, "lab", void 0);
    LabCardView = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '.lab-card',
            templateUrl: '../template/lab-card.view.html'
        }), 
        __metadata('design:paramtypes', [lab_service_1.LabService, team_service_1.TeamService])
    ], LabCardView);
    return LabCardView;
}());
exports.LabCardView = LabCardView;

//# sourceMappingURL=lab-card.view.js.map
