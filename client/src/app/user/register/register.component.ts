import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { error, success } from 'src/app/+state/notifyActions';
import { INotificate } from 'src/app/shared/interfaces/notificate-interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  notificate: INotificate = { type: '', messages: [] }
  timer: any;

  constructor(
    private _auth: AuthService,
    private _store: Store
  ) {
  }

  ngOnInit(): void {
  }

  registerSubmit(form: NgForm): void {
    let { username, password, rePassword } = form.value;
    this._auth
      .register(username, password)
      .subscribe(newUser => {
        // let newRes: INewUser = newUser
        let message = `User ${newUser.user.username} is registered`;
        this._store.dispatch(success({ messages: [{ message }] }));
        this.notificate = { type: 'message', messages: [{ message }] };
      },
        // Handle server errors
        err => {
          this._store.dispatch(error({ messages: err }))
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
