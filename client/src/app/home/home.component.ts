import { Component, DoCheck, OnInit } from '@angular/core';
import { IPW } from '../shared/interfaces/picword-interface';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  isLogged: Boolean = false;
  pws : IPW[] = [
    {'_id': '1', 'word':'car' , pictureUrl: 'https://images.pexels.com/photos/241316/pexels-photo-241316.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'},
    {'_id': '2', 'word':'dog' , pictureUrl: 'https://images.pexels.com/photos/97082/weimaraner-puppy-dog-snout-97082.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'},
    {'_id': '3', 'word':'house' , pictureUrl: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'}
  ];
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this._auth.getLoggedUserId() ? true : false;
    console.log(this.isLogged);
  }
  ngDoCheck() {
    this.isLogged = this._auth.getLoggedUserId() ? true : false;
  }
}
