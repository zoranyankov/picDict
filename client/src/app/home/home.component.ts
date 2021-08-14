import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../+state';
import { selectUsername } from '../+state/authSelectors';
import { IPW } from '../shared/interfaces/picword-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLogged$ = this._store.select(selectUsername);
  pws: IPW[] = [
    { '_id': '1', 'word': 'car', pictureUrl: 'https://images.pexels.com/photos/241316/pexels-photo-241316.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280' },
    { '_id': '2', 'word': 'dog', pictureUrl: 'https://images.pexels.com/photos/97082/weimaraner-puppy-dog-snout-97082.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280' },
    { '_id': '3', 'word': 'house', pictureUrl: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280' }
  ];
  constructor(private _store: Store<IAppState>) { }
}
