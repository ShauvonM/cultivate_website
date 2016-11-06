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
var app_component_1 = require("./app.component");
var AboutComponent = (function () {
    function AboutComponent(_app) {
        this._app = _app;
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent.prototype.onScroll = function (scrollpos) {
        this.scrollpos = scrollpos;
    };
    AboutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cultivate-about',
            templateUrl: '../template/about.component.html'
        }), 
        __metadata('design:paramtypes', [app_component_1.AppComponent])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;

//# sourceMappingURL=about.component.js.map
