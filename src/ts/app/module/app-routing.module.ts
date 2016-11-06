import { NgModule }         from "@angular/core";
import { RouterModule, Routes }     from "@angular/router";

import { HomeComponent } from "../component/home.component";
import { AboutComponent } from "../component/about.component";
import { ClassesComponent } from '../component/classes.component';
import { CalendarComponent } from '../component/calendar.component';
import { ForTeachersComponent } from '../component/for-teachers.component';

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
        path: 'classes',
        component: ClassesComponent
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
