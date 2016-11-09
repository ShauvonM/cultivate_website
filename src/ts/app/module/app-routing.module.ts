import { NgModule }         from "@angular/core";
import { RouterModule, Routes }     from "@angular/router";

import { HomeComponent } from "../component/home.component";
import { AboutComponent } from "../component/about.component";
import { ClassesComponent } from '../component/classes.component';
import { CalendarComponent } from '../component/calendar.component';
import { ForTeachersComponent } from '../component/for-teachers.component';

import { TeacherDetailsComponent } from '../component/teacher-details.component';
import { LabDetailsComponent } from '../component/lab-details.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'about/:key',
        component: TeacherDetailsComponent
    },
    {
        path: 'classes',
        component: ClassesComponent
    },
    {
        path: 'classes/:uuid',
        component: LabDetailsComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent
    },
    {
        path: 'for-teachers',
        component: ForTeachersComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {};
