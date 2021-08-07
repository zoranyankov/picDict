import { Component, OnInit } from '@angular/core';
import { PicwordsService } from 'src/app/picwords/picwords.service';
import { IPW } from 'src/app/shared/interfaces/picword-interface';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
// import { HelpService } from 'src/app/shared/services/help.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = 'User';
  userId: string = '';
  profilePWs: IPWRes[] = [];

  constructor(
    private _auth: AuthService,
    private _picword: PicwordsService,
    // private _help: HelpService,
    ) { }

  ngOnInit(): void {
    this.userName = this._auth.getLoggedUserName();
    this.userId = this._auth.getLoggedUserId();
    console.log(this.userId);
  }

  laodPws() {
    this._picword.getByUserId(this.userId)
      .subscribe((response: any) => {
        console.log(response);
        if (!response) {
          throw new Error('No Data Found!')
        }
        this.profilePWs = response;
      },
        err => {
          // this.notificate = { type: 'error', messages: err };
        })
  }

  onSelect(event: IPW) {
    
  }
}
