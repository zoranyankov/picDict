import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class IsLogged implements CanActivate {
    constructor( 
        private _router: Router, 
        private _auth:AuthService,
        ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const {data : {paramsActivateRedirectUrl}} = route;
        let validToken = this._auth.getLoggedState();
        if (validToken) { return true; }

        return this._router.parseUrl(paramsActivateRedirectUrl || '/');
        // throw new Error("Method not implemented.");

    }

}