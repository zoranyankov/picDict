import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class Logout implements CanActivate {
    constructor(private router: Router, private _auth:AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const {data : {paramsActivateRedirectUrl}} = route;
        console.log(state);
        localStorage.removeItem('sid');
        this._auth.authenticateUser(null);

        return this.router.parseUrl(paramsActivateRedirectUrl || '/');
        // throw new Error("Method not implemented.");
    }

}