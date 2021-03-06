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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('../component/app.component');
var home_component_1 = require('../component/home.component');
var about_component_1 = require('../component/about.component');
var classes_component_1 = require('../component/classes.component');
var calendar_component_1 = require('../component/calendar.component');
var for_teachers_component_1 = require('../component/for-teachers.component');
var contact_us_component_1 = require('../component/contact-us.component');
var teacher_details_component_1 = require('../component/teacher-details.component');
var lab_details_component_1 = require('../component/lab-details.component');
var nav_view_1 = require('../view/nav.view');
var person_view_1 = require('../view/person.view');
var lab_card_view_1 = require('../view/lab-card.view');
var team_service_1 = require('../service/team.service');
var lab_service_1 = require('../service/lab.service');
var app_routing_module_1 = require('./app-routing.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent,
                classes_component_1.ClassesComponent,
                calendar_component_1.CalendarComponent,
                for_teachers_component_1.ForTeachersComponent,
                contact_us_component_1.ContactUsComponent,
                teacher_details_component_1.TeacherDetailsComponent,
                lab_details_component_1.LabDetailsComponent,
                nav_view_1.NavView,
                person_view_1.PersonView,
                lab_card_view_1.LabCardView
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                team_service_1.TeamService,
                lab_service_1.LabService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
