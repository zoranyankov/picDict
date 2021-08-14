import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+state';
import { selectUsername } from 'src/app/+state/authSelectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged$ = this._store.select(selectUsername)

  constructor(private _store: Store<IAppState>) { }

}