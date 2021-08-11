import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLogged: Boolean = false;
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  // this.isLogged = this._auth.getLoggedUserId() ? true : false;
  this._auth.isLoggedIn$.subscribe(isLogged => {
    this.isLogged = isLogged;
  })
  }
}