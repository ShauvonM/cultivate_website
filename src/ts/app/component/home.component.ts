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

    scrollpos: number = 0;
    navStartHeight: number;

    constructor(
        private _app: AppComponent
    ) {}

    ngOnInit(): void {
        this.navStartHeight = window.innerHeight * 0.5;
    }

    onScroll(): void {
        this.scrollpos = document.body.scrollTop;
    }
}