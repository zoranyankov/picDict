import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PicwordsService } from 'src/app/picwords/picwords.service';
import { ResultService } from 'src/app/picwords/result.service';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { IResult } from 'src/app/shared/interfaces/result-interface';
import { IResultRes } from 'src/app/shared/interfaces/result-response-interface';
import { IResults } from 'src/app/shared/interfaces/results-interface';
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
  currentPWs: IPWRes[] = [];

  allResults: any;
  currentResults: IResults[] = [];
  loading: boolean = false;
  totalScore: number = 0;

  constructor(
    private _auth: AuthService,
    private _picword: PicwordsService,
    private _activatedRoute: ActivatedRoute,
    private _result: ResultService
    // private _help: HelpService,
  ) { }

  ngOnInit(): void {
    this.userName = this._auth.getLoggedUserName();
    this.userId = this._auth.getLoggedUserId();
    let param = this._activatedRoute.snapshot.params.load;
    if (param == 'load') {
      this.loading = true;
      return this.laodPws();
    }
    if (param == 'results') {
      this.loading = true;
      return this.loadResults();
    }
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
          // this.notificate = { type: 'error', messages: err };
        })
  }
  loadResults() {
    this.loading = true;
    this._result.getByUserId(this.userId)
      .subscribe({
        next: (response: any) => {
          this.allResults = response;
          let current = this.allResults.shift();
          this.totalScore = current.score;
          this.currentResults = current.userResults;

          // this.results = currentResults;
        },
        error: (err: any) => console.log(err)
      });
  }
  loadNextResults() {
    this.loading = true;
    let current = this.allResults.shift();
    this.totalScore = current.score;
    this.currentResults = current.userResults;
  }
}
