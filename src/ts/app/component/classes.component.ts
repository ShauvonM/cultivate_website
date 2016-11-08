import {
    Component,
    OnInit
} from '@angular/core';

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

    constructor(
        private _app: AppComponent,
        private labService: LabService
    ) {}

    ngOnInit(): void {
        this.loadClasses();
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }

    loadClasses(): void {
        this.labService.getClasses().then((classes) => this.classes = classes);
    }
}