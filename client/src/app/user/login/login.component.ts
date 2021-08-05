import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { INotificate } from 'src/app/shared/interfaces/notificate-interface';
import { IRegResponse } from 'src/app/shared/interfaces/register-response-interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  notificate: INotificate = { type: '', messages: [] }
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
        this.notificate = {type: 'message', messages: [{message}]};
      },
        // Handle server errors
        err => {
          console.log(err);
          
          this.notificate = { type: 'error', messages: err };
        });
      }
      // ngOnChanges(change: SimpleChanges) {
        
      // }

}
