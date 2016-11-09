import {
    Component,
    OnInit
} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }   from '@angular/common';

import { AppComponent } from "./app.component";
import { Person, TeamService } from "../service/team.service";
import { Lab, LabService } from "../service/lab.service";

@Component({
    moduleId: module.id,
    selector: 'cultivate-lab',
    templateUrl: '../template/lab-details.component.html'
})
export class LabDetailsComponent implements OnInit {

    scrollpos: number;

    lab: Lab;

    constructor(
        private _app: AppComponent,
        private route: ActivatedRoute,
        private location: Location,
        private teamService: TeamService,
        private labService: LabService
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let uuid = params['uuid'];
            this.getPerson(uuid);
        });
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }

    getPerson(uuid: string): void {
        this.labService.getLab(uuid).then(lab => this.lab = lab);
    }

    goBack(): void {
        this.location.back();
    }
}