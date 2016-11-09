import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import { Person, TeamService } from "../service/team.service";

@Component({
    moduleId: module.id,
    selector: '.person',
    templateUrl: '../template/person.view.html'
})
export class PersonView implements OnInit {

    @Input() person: Person;
    @Input() large: boolean;

    sessionString: string;

    constructor(
        private teamService: TeamService
    ) {}

    ngOnInit(): void {
        
    }

}