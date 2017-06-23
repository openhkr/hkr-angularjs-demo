
import {Component, OnInit} from '@angular/core';
import {Config} from "../config/app.config";
@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    providers :[Config]
})
export class RootComponent implements OnInit{
    private _selector:string = 'preloader';
    private _element:HTMLElement;

    ngOnInit() {
        this._element = document.getElementById(this._selector);
    }
    constructor() {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this._element.style['display'] = 'none';
        }, 500);
    }
}
