import {
    Component,
    OnInit
} from '@angular/core';

import { AppComponent } from "./app.component";

@Component({
    moduleId: module.id,
    selector: 'cultivate-about',
    templateUrl: '../template/about.component.html'
})
export class AboutComponent implements OnInit {

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