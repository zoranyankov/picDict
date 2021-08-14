import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
// import { map } from "rxjs/operators";
import { IAppState } from "src/app/+state";
// import { selectUsername } from "src/app/+state/selectors";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class IsLogged implements CanActivate {
    constructor(
        private _router: Router,
        private _auth: AuthService,
        private _store: Store<IAppState>
        ) { }
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const { data: { paramsActivateRedirectUrl } } = route;
        
        console.log('isLogged');
        // return this._store.select(selectUsername).pipe(map(username => {
        //     if (username == '') {
        //         return this._router.parseUrl(paramsActivateRedirectUrl || '/');
        //     }
        //     return true;
        // }))

        if (this._auth.getLoggedUserToken()) { return true; } //TODO: token validation

        return this._router.parseUrl(paramsActivateRedirectUrl || '/');
    }

}


@Injectable()
export class NotLogged implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _store: Store<IAppState>
    ) { }
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const { data: { paramsActivateRedirectUrl } } = route;

        console.log('NotLogged');
        
        // return this._store.select(selectUsername).pipe(map(username => {
        //     if (username != '') {
        //         return this._router.parseUrl(paramsActivateRedirectUrl || '/');
        //     }
        //     return true;
        // }))
        if (!this._auth.getLoggedUserToken()) { return true; } //TODO: token validation

        return this._router.parseUrl(paramsActivateRedirectUrl || '/');

    }

}