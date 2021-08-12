import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class IsLogged implements CanActivate {
    constructor(
        private _router: Router,
        private _auth: AuthService,
    ) {}
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const { data: { paramsActivateRedirectUrl } } = route;
        
        if (this._auth.getLoggedUserToken()) { return true; } //TODO: token validation
       
        return this._router.parseUrl(paramsActivateRedirectUrl || '/');
    }

}