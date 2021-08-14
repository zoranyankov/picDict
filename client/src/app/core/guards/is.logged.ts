// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
// import { Observable } from "rxjs";
// import { AuthService } from "src/app/user/auth.service";

// @Injectable()
// export class IsLogged implements CanActivate {
//     constructor(
//         private _router: Router,
//         private _auth: AuthService,
//     ) {}
//     canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//         const { data: { paramsActivateRedirectUrl } } = route;
        
//         if (this._auth.getLoggedUserToken()) { return true; } //TODO: token validation
       
//         return this._router.parseUrl(paramsActivateRedirectUrl || '/');
//     }

// }


// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
// import { Store } from "@ngrx/store";
// import { Observable } from "rxjs";
// import { IAppState } from "src/app/+state";
// import { selectUsername } from "src/app/+state/selectors";
// import { AuthService } from "src/app/user/auth.service";

// @Injectable()
// export class IsLogged implements CanActivate {
//     username$ = this._store.select(selectUsername);
//     constructor(
//         private _router: Router,
//         private _auth: AuthService,
//         private _store: Store<IAppState>,
//     ) { }
//     canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//         const { data: { paramsActivateRedirectUrl, username } } = route;

//         this.username$.subscribe(username => {
//             if (!username) {
//                 return this._router.parseUrl(paramsActivateRedirectUrl || '/');
//             }
//             return true;
//         })
//         // this._store.pipe(state => {console.log(state); return state})

//         // if (this._auth.getLoggedUserToken()) { return true; } //TODO: token validation


//         return this._router.parseUrl(paramsActivateRedirectUrl || '/');
//     }

// }