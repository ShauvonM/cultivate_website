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
    LabService.prototype.getLabs = function () {
        var _this = this;
        if (!this._labPromise) {
            this._labPromise = new Promise(function (resolve, reject) {
                _this.labs = labs_data_1.LABS;
                _this.labs.sort(function (lab1, lab2) {
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
                resolve(_this.labs);
            });
        }
        return this._labPromise;
    };
    LabService.prototype.getClasses = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var classes = [];
            _this.getLabs().then(function (labs) {
                labs.forEach(function (lab) {
                    // TODO: make this an enum?
                    if (lab.type == "class") {
                        classes.push(lab);
                    }
                });
                resolve(classes);
            });
        });
    };
    LabService.prototype.getLab = function (uuid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getLabs().then(function (labs) {
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
