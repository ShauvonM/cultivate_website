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
var common_1 = require('@angular/common');
var moment = require('moment');
var app_component_1 = require("./app.component");
var team_service_1 = require("../service/team.service");
var lab_service_1 = require("../service/lab.service");
var date_utils_1 = require("../util/date.utils");
var LabDetailsComponent = (function () {
    function LabDetailsComponent(_app, route, location, teamService, labService) {
        this._app = _app;
        this.route = route;
        this.location = location;
        this.teamService = teamService;
        this.labService = labService;
        this.dates = [];
    }
    LabDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var uuid = params['uuid'];
            _this.getLab(uuid);
        });
    };
    LabDetailsComponent.prototype.onScroll = function (scrollpos) {
        this.scrollpos = scrollpos;
    };
    LabDetailsComponent.prototype.getLab = function (uuid) {
        var _this = this;
        this.labService.getLab(uuid).then(function (lab) {
            _this.lab = lab;
            _this.getTeacher();
            _this.getFullDateInfo();
        });
    };
    LabDetailsComponent.prototype.getTeacher = function () {
        var _this = this;
        if (!this.lab) {
            return;
        }
        this.teamService.getPerson(this.lab.teacherKey)
            .then(function (person) { return _this.teacher = person; });
    };
    LabDetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    LabDetailsComponent.prototype.getFullDateInfo = function () {
        this.dates = [];
        this.time = "";
        if (this.lab.repeatType) {
            // repeats!
            var repeatInterval = void 0;
            var date = this.lab.dates[0];
            var time = this.lab.times[0];
            var duration = this.lab.durations[0];
            var utcTime = date + "T" + time;
            //let startTime = moment(utcTime);
            this.repeatString = date_utils_1.default.getRepeatString(this.lab);
            if (this.lab.sessionCount) {
                // get start and end dates
                this.dates.push(date_utils_1.default.getStartToEndDateString(this.lab));
            }
            //this.time = DateUtils.getStartToEndTimeString(startTime, startTime.clone().add(duration, "m"));
            this.time = date_utils_1.default.getStartToEndTimeString(this.lab);
        }
        else {
            // doesn't repeat!
            // sort through all the dates
            for (var i = 0; i < this.lab.dates.length; i++) {
                var date = this.lab.dates[i];
                var time = this.lab.times[i] ? this.lab.times[i] : this.lab.times[0];
                var duration = this.lab.durations[i] ? this.lab.durations[i] : this.lab.durations[0];
                var utcTime = date + "T" + time;
                var startTime = moment(utcTime);
                var dateString = date_utils_1.default.getDateString(startTime);
                //let endTime = startTime.clone().add(duration, "m");
                if (this.lab.times.length == 1 && !this.time) {
                    // each date has the same time
                    //this.time = DateUtils.getStartToEndTimeString(startTime, endTime);
                    this.time = date_utils_1.default.getStartToEndTimeString(this.lab);
                }
                else {
                    // each date has its own time
                    //dateString += "<br /> " + DateUtils.getStartToEndTimeString(startTime, endTime);
                    dateString += "<br /> " + date_utils_1.default.getStartToEndTimeString(this.lab, i);
                }
                this.dates.push(dateString);
            }
        }
    };
    LabDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cultivate-lab',
            templateUrl: '../template/lab-details.component.html'
        }), 
        __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.ActivatedRoute, common_1.Location, team_service_1.TeamService, lab_service_1.LabService])
    ], LabDetailsComponent);
    return LabDetailsComponent;
}());
exports.LabDetailsComponent = LabDetailsComponent;

//# sourceMappingURL=lab-details.component.js.map
