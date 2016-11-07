import {
    Component,
    OnInit
} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }   from '@angular/common';

import { AppComponent } from "./app.component";
import { Person, TeamService } from "../service/team.service";

@Component({
    moduleId: module.id,
    selector: 'cultivate-teacher',
    templateUrl: '../template/teacher-details.component.html'
})
export class TeacherDetailsComponent implements OnInit {

    scrollpos: number;

    person: Person;

    constructor(
        private _app: AppComponent,
        private route: ActivatedRoute,
        private location: Location,
        private teamService: TeamService
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let key = params['key'];
            this.getPerson(key);
        });
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }

    getPerson(key: string): void {
        this.teamService.getPerson(key)
            .then(teacher => this.person = teacher);
    }

    goBack(): void {
        this.location.back();
    }
}