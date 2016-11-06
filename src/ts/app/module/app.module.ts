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

import { NavView } from '../view/nav.view';

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

        NavView
    ],
    bootstrap: [ AppComponent ],
    providers: []
})

export class AppModule { }