import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class NotLogged implements CanActivate {
    // notLoggedIn: boolean = false;
    constructor(private _auth: AuthService, private router: Router) { 
        // this._auth.isNotLoggedIn$.subscribe(isNotLoggedIn => {
        //     console.log(isNotLoggedIn);
            
        //     this.notLoggedIn = isNotLoggedIn
        // });
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const {data : {paramsActivateRedirectUrl}} = route;
        
        if (!this._auth.getLoggedUserToken()) { return true; } //TODO: token validation
        // this._auth.isNotLoggedIn$.pipe(switchMap(isNotLogged => isNotLogged)).subscribe(isNotLogged => {
        //     console.log(isNotLogged);
        //     return isNotLogged;
        // })
        // if(this._auth.isNotLoggedIn$.pipe(map(isNotLoggedIn => isNotLoggedIn))) {return true}
        // console.log(this.notLoggedIn);
        
        // if(this.notLoggedIn) {return true}
        
        localStorage.removeItem('sid');
        
        return this.router.parseUrl(paramsActivateRedirectUrl || '/');
        // throw new Error("Method not implemented.");

    }

}