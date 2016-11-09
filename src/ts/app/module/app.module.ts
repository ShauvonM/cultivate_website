import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PathLocationStrategy } from '@angular/common';

import { AppComponent } from '../component/app.component';
import { HomeComponent } from '../component/home.component';
import { AboutComponent } from '../component/about.component';
import { ClassesComponent } from '../component/classes.component';
import { CalendarComponent } from '../component/calendar.component';
import { ForTeachersComponent } from '../component/for-teachers.component';

import { TeacherDetailsComponent } from '../component/teacher-details.component';
import { LabDetailsComponent } from '../component/lab-details.component';

import { NavView } from '../view/nav.view';
import { LabCardView } from '../view/lab-card.view';

import { TeamService } from '../service/team.service';
import { LabService } from '../service/lab.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
     ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ClassesComponent,
        CalendarComponent,
        ForTeachersComponent,

        TeacherDetailsComponent,
        LabDetailsComponent,

        NavView,
        LabCardView
    ],
    bootstrap: [ AppComponent ],
    providers: [ 
        TeamService,
        LabService
    ]
})

export class AppModule { }