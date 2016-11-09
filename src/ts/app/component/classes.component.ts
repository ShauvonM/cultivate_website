import {
    Component,
    OnInit
} from '@angular/core';
import { Router }   from '@angular/router';

import { AppComponent } from "./app.component";

import { Lab, LabService } from "../service/lab.service";

@Component({
    moduleId: module.id,
    selector: 'cultivate-classes',
    templateUrl: '../template/classes.component.html'
})
export class ClassesComponent implements OnInit {

    scrollpos: number;

    classes: Lab[] = [];
    dropins: Lab[] = [];

    constructor(
        private _app: AppComponent,
        private router: Router,
        private labService: LabService
    ) {}

    ngOnInit(): void {
        this.loadClasses();
        this.loadDropins();
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }

    loadClasses(): void {
        this.labService.getLabs("class").then((classes) => this.classes = classes);
    }

    loadDropins(): void {
        this.labService.getLabs("drop-in").then((dropins) => this.dropins = dropins);
    }

    clickLab(lab: Lab): void {
        this.router.navigate(['/classes', lab.uuid]);
    }
}