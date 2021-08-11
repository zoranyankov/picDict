import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class IsLogged implements CanActivate {
    // loggedIn: boolean = false;
    constructor(
        private _router: Router,
        private _auth: AuthService,
    ) {
        // this._auth.isLoggedIn$.subscribe(isLoggedIn => this.loggedIn = isLoggedIn)  ;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const { data: { paramsActivateRedirectUrl } } = route;
        // console.log(this._auth.currentUser$);
        // console.log(this._auth.isLoggedIn$);
        // console.log(this.loggedIn);
        
        // if(this.loggedIn) {return true};
        
        if (this._auth.getLoggedUserToken()) { return true; } //TODO: token validation
        // this._auth.isLoggedIn$.subscribe(isLogged => {
        //     console.log(isLogged);
        //     return isLogged;
        // })
        // if (this._auth.isLoggedIn$.pipe(map(isLoggedIn => isLoggedIn))) { return true }

        return this._router.parseUrl(paramsActivateRedirectUrl || '/');
        // throw new Error("Method not implemented.");

    }

}