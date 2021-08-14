import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { logout } from "src/app/+state/authActions";
import { initialState } from "src/app/+state/authReducers";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class Logout implements CanActivate {
    constructor(private router: Router, private _auth:AuthService, private _store:Store) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const {data : {paramsActivateRedirectUrl}} = route;
        console.log(state);
        localStorage.removeItem('sid');
        this._auth.authenticateUser(null);
        this._store.dispatch(logout())

        return this.router.parseUrl(paramsActivateRedirectUrl || '/');
        // throw new Error("Method not implemented.");
    }

}