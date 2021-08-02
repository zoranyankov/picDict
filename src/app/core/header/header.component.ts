import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck{
  isLogged: Boolean = false;
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  this.isLogged = this._auth.getLoggedState();
  }
  ngDoCheck() {
    this.isLogged = this._auth.getLoggedState();
  }
}
