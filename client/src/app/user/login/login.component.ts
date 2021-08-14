import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { error, success } from 'src/app/+state/notifyActions';
import { INotificate } from 'src/app/shared/interfaces/notificate-interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  notificate: INotificate = { type: '', messages: [] };
  timer: any;

  constructor(
    private _auth: AuthService,
    private _store: Store,
  ) { }

  ngOnInit(): void {
  }

  loginSubmit(form: NgForm): void {
    let { username, password } = form.value;
    this._auth
      .login(username, password)
      .subscribe(newUser => {
        let message = `User ${newUser.user.username} is logged in`;
        this._store.dispatch(success({ messages: [{message}] }));
        this.notificate = { type: 'message', messages: [{ message }] };
      },
        // Handle server errors
        err => {
          console.log(err);
          this._store.dispatch(error({ messages: err }));
          this.notificate = { type: 'error', messages: err };
          this.timer = setTimeout(() => {

            this.notificate = { type: '', messages: [] };
          }, 5000);
        });
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
