import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { timer } from 'rxjs';
import { INotificate } from 'src/app/shared/interfaces/notificate-interface';
import { IRegResponse } from 'src/app/shared/interfaces/register-response-interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  notificate: INotificate = { type: '', messages: [] };
  timer: any;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  loginSubmit(form: NgForm): void {
    let { username, password } = form.value;
    console.log(username, password);
    this._authService
      .login(username, password)
      .subscribe(newUser => {
        let newRes: IRegResponse = newUser
        let message = `User ${newRes.user.username} is logged in`;
        this.notificate = { type: 'message', messages: [{ message }] };
      },
        // Handle server errors
        err => {
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
