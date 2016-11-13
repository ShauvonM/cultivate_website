import {
    Component,
    OnInit
} from '@angular/core';

import { AppComponent } from "./app.component";

@Component({
    moduleId: module.id,
    selector: 'cultivate-contact-us',
    templateUrl: '../template/contact-us.component.html'
})
export class ContactUsComponent implements OnInit {

    scrollpos: number;
    formData = {
        name: "",
        email: "",
        subject: "",
        message: ""
    };

    constructor(
        private _app: AppComponent
    ) {}

    ngOnInit(): void {
    }

    onScroll(scrollpos): void {
        this.scrollpos = scrollpos;
    }
}