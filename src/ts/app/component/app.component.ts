import {
    Component,
    OnInit
} from "@angular/core";
import "rxjs/Subject";
import { Subject } from 'rxjs/Subject';
import { Router, RoutesRecognized } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'cultivate',
    templateUrl: '../template/app.component.html'
})
export class AppComponent implements OnInit {

    constructor( 
        private router: Router
    ) {}

    ngOnInit(): void {
        
    }

    isMobile(): boolean {
        return window.innerWidth <= 500;
    }

}