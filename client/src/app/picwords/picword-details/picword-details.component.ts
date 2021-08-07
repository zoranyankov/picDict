import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PicwordsService } from '../picwords.service';

@Component({
  selector: 'app-picword-details',
  templateUrl: './picword-details.component.html',
  styleUrls: ['./picword-details.component.css']
})
export class PicwordDetailsComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _picword: PicwordsService
  ) { }

  ngOnInit(): void {
    let pwId = this._activatedRoute.snapshot.params.pwId;
    console.log(pwId);
    this._picword.getone(pwId)
    .subscribe((response: any) => {
      console.log(response);
      // if (!response) {
      //   throw new Error('No Data Found!')
      // }
      // this.profilePWs = response;
    },
      err => {
        // this.notificate = { type: 'error', messages: err };
      })
  }

}
