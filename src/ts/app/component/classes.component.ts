import {
    Component,
    OnInit
} from '@angular/core';

import { AppComponent } from "./app.component";

@Component({
    moduleId: module.id,
    selector: 'cultivate-classes',
    templateUrl: '../template/classes.component.html'
})
export class ClassesComponent implements OnInit {

    scrollpos: number;

    constructor(
        private _app: AppComponent
    ) {}

    ngOnInit(): void {
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }
}