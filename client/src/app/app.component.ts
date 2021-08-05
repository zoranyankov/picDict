import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'picDict';
  isLogged: Boolean = false
  constructor(private _auth:AuthService) {}
  ngOnInit() {
    this.isLogged = this._auth.getLoggedState()
  }
}
