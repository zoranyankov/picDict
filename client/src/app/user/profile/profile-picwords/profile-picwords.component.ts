import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { error } from 'src/app/+state/notifyActions';
import { PicwordsService } from 'src/app/picwords/picwords.service';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile-picwords',
  templateUrl: './profile-picwords.component.html',
  styleUrls: ['./profile-picwords.component.css']
})
export class ProfilePicwordsComponent implements OnInit {
  userName: string = 'User';
  userId: string = '';
  loading: boolean = false;

  
  profilePWs: IPWRes[] = [];
  currentPWs: IPWRes[] = [];

  constructor(
    private _auth: AuthService,
    private _picword: PicwordsService,
    private _store: Store,
  ) { }

  ngOnInit(): void {
    this.userName = this._auth.getLoggedUserName();
    this.userId = this._auth.getLoggedUserId();
    this.laodPws();
  }
  
  moreSubmit() {
    // Loop the initial array

    // Variant 1
    // let pastPWs = this.profilePWs.splice(0, 6);
    // this.currentPWs = this.profilePWs.slice(0,6);
    // this.profilePWs = this.profilePWs.concat(pastPWs);

    // Variant 2
    this.currentPWs = this.currentPWs.concat(this.profilePWs.splice(0, 6))
  }

  laodPws() {
    this.loading = true;
    this._picword.getByUserId(this.userId)
      .subscribe((response: any) => {
        if (!response) {
          throw new Error('No Data Found!')
        }
        this.profilePWs = response;
        this.currentPWs = this.profilePWs.splice(0, 6);
      },
        err => {
          this._store.dispatch(error({ messages: err }));
        })
  } 
}
