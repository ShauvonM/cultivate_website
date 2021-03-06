import {
    Component,
    OnInit
} from '@angular/core';

import { AppComponent } from "./app.component";

@Component({
    moduleId: module.id,
    selector: 'cultivate-home',
    templateUrl: '../template/home.component.html'
})
export class HomeComponent implements OnInit {

    scrollpos: number

    constructor(
        private _app: AppComponent
    ) {}

    ngOnInit(): void {
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }
}