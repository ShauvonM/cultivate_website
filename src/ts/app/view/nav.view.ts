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
    mobile: boolean;

    scrollpos: number;
    navStartHeight: number;
    navHeight: number;

    width: number;

    @Output() windowScroll: EventEmitter<number> = new EventEmitter();

    constructor(
    ) {}

    ngOnInit(): void {
        this.onResize();

        if (!this.large && window.innerWidth <= 500) {
            // mobile!
            this.mobile = true;

            if (this.scrollpos < this.navStartHeight) {
                this.scrollTo(this.navStartHeight * 0.9, false);
            }
        }
    }

    onResize(): void {
        if (window.innerWidth != this.width) {
            let nav = document.querySelector('nav');
            nav.className="";
            nav.removeAttribute('style');
            this.navStartHeight = nav.offsetHeight;
            this.navHeight = this.navStartHeight;

            // this will make up for mobile browsers screwing up the page height when you scroll
            let page = document.querySelector('.page') as HTMLElement;
            page.style.paddingTop = this.navStartHeight + 'px';

            this.onScroll();

            this.width = window.innerWidth;
        }
    }

    onScroll(): void {
        this.scrollpos = document.body.scrollTop;
        // browsers will ignore height values less than 0
        this.navHeight = Math.max(this.navStartHeight - this.scrollpos, 0);

        this.windowScroll.emit(this.scrollpos);
    }

    smallLogoClick(): void {
        this.scrollTo(0, true);
    }

    private scrollTo(to: number, animate: boolean) {
        this._scrollTo(document.body, to, animate ? 300 : 0);
    }

    private _scrollTo(element, to, duration) {
        if (duration < 0) return;
        var difference = to - element.scrollTop;
        var perTick = duration > 0 ? difference / duration * 10 : difference;

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            if (duration - 10 > 0) {
                this._scrollTo(element, to, duration - 10);
            }
        }, 10);
    }
}