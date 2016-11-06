import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'nav-component',
    templateUrl: '../template/nav.component.html'
})
export class NavView implements OnInit {
    
    @Input() large: boolean;

    scrollpos: number;
    navStartHeight: number;

    //navHeight: number;

    width: number;

    @Output() windowScroll: EventEmitter<number> = new EventEmitter();

    constructor(
    ) {}

    ngOnInit(): void {
        this.onResize();
    }

    onResize(): void {
        if (window.innerWidth != this.width) {
            let nav = document.querySelector('nav');
            nav.removeAttribute('style');
            this.navStartHeight = nav.offsetHeight;

            // this will make up for mobile browsers screwing up the page height when you scroll
            let page = document.querySelector('.page') as HTMLElement;
            page.style.paddingTop = this.navStartHeight + 'px';

            this.onScroll();
            this.width = window.innerWidth;
        }
    }

    onScroll(): void {
        this.scrollpos = document.body.scrollTop

        this.windowScroll.emit(this.scrollpos);
    }

    smallLogoClick(): void {
        this._scrollTo(document.body, 0, 300);
    }

    private _scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            this._scrollTo(element, to, duration - 10);
        }, 10);
    }
}