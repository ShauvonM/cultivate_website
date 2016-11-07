import {
    Component,
    OnInit
} from '@angular/core';
import { Router }   from '@angular/router';

import { AppComponent } from "./app.component";
import { Person, TeamService } from "../service/team.service";

@Component({
    moduleId: module.id,
    selector: 'cultivate-about',
    templateUrl: '../template/about.component.html'
})
export class AboutComponent implements OnInit {

    scrollpos: number;

    teamData = []

    constructor(
        private _app: AppComponent,
        private router: Router,
        private teamService: TeamService
    ) {}

    ngOnInit(): void {
        this.getFounders();
        this.getTeachers();
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }

    getFounders(): void {
        this.teamService.getFounders()
            .then((team) => {
                this.teamData.push({
                    data: team
                });
            });
    }

    getTeachers(): void {
        this.teamService.getTeachers()
            .then((team) => {
                this.teamData.push({
                    key: "teachers",
                    data: team
                });
            });
    }

    clickPerson(person: Person): void {
        this.router.navigate(['/about', person.key]);
    }
}