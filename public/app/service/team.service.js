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
var team_data_1 = require('../data/team.data');
var Person = (function () {
    function Person() {
    }
    return Person;
}());
exports.Person = Person;
var TeamService = (function () {
    function TeamService() {
        this.people = [];
    }
    TeamService.prototype.getTeam = function () {
        if (!this._teamPromise) {
            this._teamPromise = Promise.resolve(team_data_1.TEAM);
        }
        return this._teamPromise;
    };
    TeamService.prototype.getFounders = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getTeam().then(function (team) {
                var founders = [];
                team.forEach(function (person) {
                    if (person.founder && !person.inactive) {
                        founders.push(person);
                    }
                });
                resolve(founders);
            });
        });
    };
    TeamService.prototype.getTeachers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getTeam().then(function (team) {
                var teachers = [];
                team.forEach(function (person) {
                    if (!person.founder && !person.inactive) {
                        teachers.push(person);
                    }
                });
                resolve(teachers);
            });
        });
    };
    TeamService.prototype.getPerson = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getTeam().then(function (team) {
                team.forEach(function (person) {
                    if (person.key == key) {
                        resolve(person);
                    }
                });
            });
        });
    };
    TeamService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TeamService);
    return TeamService;
}());
exports.TeamService = TeamService;

//# sourceMappingURL=team.service.js.map
