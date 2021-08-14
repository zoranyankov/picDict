import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { selectMessages, selectNotify, selectType } from './+state/notifySelectors';
import { IAppState } from './+state';
import { error } from './+state/notifyActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'picDict';
  currUser: any = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  type$ = this._store.select(selectType);
  messages$ = this._store.select(selectMessages);
  notify$ = this._store.select(selectNotify);

  constructor(
    private _auth: AuthService,
    private _snack: MatSnackBar,
    private _store: Store<IAppState>
  ) {

    this.notify$.subscribe(notify => {
      let message = notify.messages.reduce((a, m) => a += ` "${m.message}" `, '');
      if (notify.type == 'error') {
        this._snack.open(message, void 0, {
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
          verticalPosition: this.verticalPosition
        })
      } else if (notify.type == 'success') {
        this._snack.open(message, void 0, {
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
          verticalPosition: this.verticalPosition
        })
      }
    })

    // Check if there is record (from BackEnd) in local storage and if yes - checks token validity
    let storage = localStorage.getItem('sid');
    // If there is invalid format of the storage - clears it
    try {
      let { username, token } = storage && JSON.parse(storage) ? JSON.parse(storage) : { username: '', token: '' };
      if (!storage || !username || !token) {
        this._auth.authenticateUser(null);
        localStorage.removeItem('sid');
        throw new Error('Invalid Token');
      }
    } catch (error) {
      this._auth.authenticateUser(null);
      localStorage.removeItem('sid');
      return;
    }
    let user = storage ? JSON.parse(storage) : null;

    // If there is a valid storage format - verifies the validity of the token
    this._auth
      .verify(user)
      .subscribe(res => {
        if (!res || res.result == false) {
          localStorage.removeItem('sid');
          this._auth.authenticateUser(null);
          return;
        }
      }
        ,
        err => {
          console.log(err);
          this._store.dispatch(error({ messages: err }));
          localStorage.removeItem('sid');
          this._auth.authenticateUser(null);
        }
      )


    this._auth.authenticateUser(user)
  }
  showSB() {
    this._snack.open('Message archived', void 0, {
      duration: 3000,
      panelClass: ['red-snackbar', 'login-snackbar'],
      verticalPosition: this.verticalPosition
    });
  }
}