import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  registerSubmit(form:NgForm) :void{
    let {username, password, rePassword} = form.value;
    console.log(username, password, rePassword);
    this._authService
    .register(username, password)
    .subscribe(res => { 
      console.log(res);
    },
    // Handle server errors
    err => console.log('ERR' + err))
  }

}
