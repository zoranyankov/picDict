import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogged: Boolean = false;
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this._auth.getLoggedState();
    console.log(this.isLogged);
  }

}
