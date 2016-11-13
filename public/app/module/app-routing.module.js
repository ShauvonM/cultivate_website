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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("../component/home.component");
var about_component_1 = require("../component/about.component");
var classes_component_1 = require('../component/classes.component');
var calendar_component_1 = require('../component/calendar.component');
var for_teachers_component_1 = require('../component/for-teachers.component');
var contact_us_component_1 = require('../component/contact-us.component');
var teacher_details_component_1 = require('../component/teacher-details.component');
var lab_details_component_1 = require('../component/lab-details.component');
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent
    },
    {
        path: 'about/:key',
        component: teacher_details_component_1.TeacherDetailsComponent
    },
    {
        path: 'classes',
        component: classes_component_1.ClassesComponent
    },
    {
        path: 'classes/:uuid',
        component: lab_details_component_1.LabDetailsComponent
    },
    {
        path: 'calendar',
        component: calendar_component_1.CalendarComponent
    },
    {
        path: 'for-teachers',
        component: for_teachers_component_1.ForTeachersComponent
    },
    {
        path: 'contact',
        component: contact_us_component_1.ContactUsComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
;

//# sourceMappingURL=app-routing.module.js.map
