import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { error } from 'src/app/+state/notifyActions';
import { ResultService } from 'src/app/picwords/result.service';
import { IResultRes } from 'src/app/shared/interfaces/result-response-interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile-results',
  templateUrl: './profile-results.component.html',
  styleUrls: ['./profile-results.component.css']
})
export class ProfileResultsComponent implements OnInit {
  userName: string = 'User';
  userId: string = '';
  loading: boolean = false;

  allResults: IResultRes[] = [];
  // currentResults: IResults[] = [];

  currentResult:IResultRes | undefined;

  totalScore: string = '0';
  constructor(
    private _auth: AuthService,
    private _result: ResultService,
    private _store: Store,
  ) {

  }

  ngOnInit(): void {
    this.userName = this._auth.getLoggedUserName();
    this.userId = this._auth.getLoggedUserId();
    this.loadResults();
  }

  loadResults() {
    this.loading = true;
    this._result.getByUserId(this.userId)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.allResults = [...response];
        },
        error: (err: any) => {
          console.log(err);
          this._store.dispatch(error({ messages: err }));
        }
      });
  }

  toggleTable(ev: Event) {
    let tableEl = (ev.currentTarget as HTMLElement).children[1];
    let style = tableEl.getAttribute('style');
    if(style == 'display: none;'){
      tableEl.setAttribute('style', 'display:inline-block');
    } else {      
      tableEl.setAttribute('style', 'display: none;');
    }
  }
}
