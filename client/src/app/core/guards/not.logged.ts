import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class NotLogged implements CanActivate {
    constructor(private _auth: AuthService, private router: Router) { 
    }
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const {data : {paramsActivateRedirectUrl}} = route;
        
        if (!this._auth.getLoggedUserToken()) { return true; } //TODO: token validation

       localStorage.removeItem('sid');

        return this.router.parseUrl(paramsActivateRedirectUrl || '/');

    }

}