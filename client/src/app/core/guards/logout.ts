import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { logout } from "src/app/+state/authActions";
import { success } from "src/app/+state/notifyActions";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class Logout implements CanActivate {
    constructor(private router: Router, private _auth:AuthService, private _store:Store) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const {data : {paramsActivateRedirectUrl}} = route;
        localStorage.removeItem('sid');
        this._auth.authenticateUser(null);
        this._store.dispatch(logout());
        this._store.dispatch(success({messages:[{message: 'You leave successfully'}]}))

        return this.router.parseUrl(paramsActivateRedirectUrl || '/');
        // throw new Error("Method not implemented.");
    }

}