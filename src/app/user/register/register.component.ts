import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { INotificate } from 'src/app/shared/interfaces/notificate-interface';
import { IRegResponse } from 'src/app/shared/interfaces/register-response-interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  notificate: INotificate = { type: '', messages: [] }
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  registerSubmit(form: NgForm): void {
    let { username, password, rePassword } = form.value;
    console.log(username, password, rePassword);
    this._authService
      .register(username, password)
      .subscribe(newUser => {
        let newRes: IRegResponse = newUser
        let message = `User ${newRes.user.username} is registered`;
        this.notificate = {type: 'message', messages: [{message}]};
      },
        // Handle server errors
        err => {
          this.notificate = { type: 'error', messages: err };
        });
      }
      // ngOnChanges(change: SimpleChanges) {

      // }
  }
