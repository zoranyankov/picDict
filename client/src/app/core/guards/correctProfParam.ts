import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class CorrectProfParam implements CanActivate {
    constructor(
        private _router: Router,
        private _auth: AuthService,
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const { data: { paramsActivateRedirectUrl } } = route;
        console.log(route);
        console.log(state);
        
        if (this._auth.getLoggedUserToken() && (route.params.load == 'load' || route.params.load == 'results')) { return true; } //TODO: token validation
       
        return this._router.parseUrl(paramsActivateRedirectUrl || '/');
    }

}