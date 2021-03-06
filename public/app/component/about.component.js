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
var app_component_1 = require("./app.component");
var team_service_1 = require("../service/team.service");
var AboutComponent = (function () {
    function AboutComponent(_app, router, teamService) {
        this._app = _app;
        this.router = router;
        this.teamService = teamService;
        this.teamData = [];
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.getFounders();
        this.getTeachers();
    };
    AboutComponent.prototype.onScroll = function (scrollpos) {
        this.scrollpos = scrollpos;
    };
    AboutComponent.prototype.getFounders = function () {
        var _this = this;
        this.teamService.getFounders()
            .then(function (team) {
            _this.teamData.push({
                data: team
            });
        });
    };
    AboutComponent.prototype.getTeachers = function () {
        var _this = this;
        this.teamService.getTeachers()
            .then(function (team) {
            _this.teamData.push({
                key: "teachers",
                data: team
            });
        });
    };
    AboutComponent.prototype.clickPerson = function (person) {
        this.router.navigate(['/about', person.key]);
    };
    AboutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cultivate-about',
            templateUrl: '../template/about.component.html'
        }), 
        __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.Router, team_service_1.TeamService])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;

//# sourceMappingURL=about.component.js.map
