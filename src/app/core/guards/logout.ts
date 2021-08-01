import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StateService } from "../state.service";

@Injectable()
export class Logout implements CanActivate {
    constructor(private _state: StateService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const {data : {paramsActivateRedirectUrl}} = route;
        console.log(state);

        this._state.changeLoggedState(false);

        return this.router.parseUrl(paramsActivateRedirectUrl || '/');
        // throw new Error("Method not implemented.");

    }

}