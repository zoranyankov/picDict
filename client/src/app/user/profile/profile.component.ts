import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PicwordsService } from 'src/app/picwords/picwords.service';
import { ResultService } from 'src/app/picwords/result.service';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { IResults } from 'src/app/shared/interfaces/results-interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck {
  userName: string = 'User';
  userId: string = '';
  profilePWs: IPWRes[] = [];
  currentPWs: IPWRes[] = [];

  allResults: any;
  currentResults: IResults[] = [];
  loading: boolean = false;
  totalScore: number = 0;

  currentPage: string = '';


  constructor(
    private _auth: AuthService,
    private _picword: PicwordsService,
    private _route: ActivatedRoute,
    private _result: ResultService
  ) {
    this._route.params.subscribe(param => {
      this.currentPage = param.load;
      return param;
    })
  }

  ngOnInit(): void {
    console.log(this.currentPage);

    this.userName = this._auth.getLoggedUserName();
    this.userId = this._auth.getLoggedUserId();
    let param = this._route.snapshot.params.load;
    if (param == 'load') {
      this.loading = true;
      return this.laodPws();
    }
    if (param == 'results') {
      this.loading = true;
      return this.loadResults();
    }
  }
  ngDoCheck() {
    let param = this.currentPage;
    console.log(param);

    if (param == 'load' && this.currentResults.length != 0) {
      this.currentResults = [];
      this.loading = true;
      return this.laodPws();
    }
    if (param == 'results' && this.currentPWs.length != 0) {
      this.currentPWs = [];
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
          this.allResults = [...response];
          let current = this.allResults.shift();
          this.totalScore = current.score;
          this.currentResults = current.userResults;
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
