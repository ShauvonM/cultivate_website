"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var NavView = (function () {
    function NavView() {
        this.windowScroll = new core_1.EventEmitter();
    }
    NavView.prototype.ngOnInit = function () {
        this.onResize();
        if (!this.large && window.innerWidth <= 500) {
            // mobile!
            this.mobile = true;
            if (this.scrollpos < this.navStartHeight) {
                this.scrollTo(this.navStartHeight * 0.9, false);
            }
        }
    };
    NavView.prototype.onResize = function () {
        if (window.innerWidth != this.width) {
            var nav = document.querySelector('nav');
            nav.className = "";
            nav.removeAttribute('style');
            this.navStartHeight = nav.offsetHeight;
            this.navHeight = this.navStartHeight;
            // this will make up for mobile browsers screwing up the page height when you scroll
            var page = document.querySelector('.page');
            page.style.paddingTop = this.navStartHeight + 'px';
            this.onScroll();
            this.width = window.innerWidth;
        }
    };
    NavView.prototype.onScroll = function () {
        this.scrollpos = document.body.scrollTop;
        // browsers will ignore height values less than 0
        this.navHeight = Math.max(this.navStartHeight - this.scrollpos, 0);
        this.windowScroll.emit(this.scrollpos);
    };
    NavView.prototype.smallLogoClick = function () {
        this.scrollTo(0, true);
    };
    NavView.prototype.scrollTo = function (to, animate) {
        this._scrollTo(document.body, to, animate ? 300 : 0);
    };
    NavView.prototype._scrollTo = function (element, to, duration) {
        var _this = this;
        if (duration < 0)
            return;
        var difference = to - element.scrollTop;
        var perTick = duration > 0 ? difference / duration * 10 : difference;
        setTimeout(function () {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to)
                return;
            if (duration - 10 > 0) {
                _this._scrollTo(element, to, duration - 10);
            }
        }, 10);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NavView.prototype, "large", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NavView.prototype, "windowScroll", void 0);
    NavView = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'nav-component',
            templateUrl: '../template/nav.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], NavView);
    return NavView;
}());
exports.NavView = NavView;

//# sourceMappingURL=nav.view.js.map
