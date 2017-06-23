import { Injectable }       from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
}                           from '@angular/router';
import {window} from "rxjs/operator/window";

@Injectable()
export class AuthGuard implements CanActivate ,CanActivateChild{
    constructor( private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
            let url: string = state.url;
            sessionStorage.setItem('routeUrl',url);
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.canActivate(route, state);
    }



    checkLogin(url: string): boolean {
        return true;
    }
}
