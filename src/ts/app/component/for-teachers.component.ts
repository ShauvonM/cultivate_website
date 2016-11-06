import {
    Component,
    OnInit
} from '@angular/core';

import { AppComponent } from "./app.component";

@Component({
    moduleId: module.id,
    selector: 'cultivate-for-teachers',
    templateUrl: '../template/for-teachers.component.html'
})
export class ForTeachersComponent implements OnInit {

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