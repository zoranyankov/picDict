import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { PicwordsService } from '../picwords.service';

@Component({
  selector: 'app-picword-details',
  templateUrl: './picword-details.component.html',
  styleUrls: ['./picword-details.component.css']
})
export class PicwordDetailsComponent implements OnInit {
  pW: IPWRes | undefined;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _picword: PicwordsService
  ) { }

  ngOnInit(): void {
    let pwId = this._activatedRoute.snapshot.params.pwId;
    this._picword.getOne(pwId)
    .subscribe((response: any) => {
      // Format the date
      // response.createdAt = response.createdAt.substring(0,10);
      this.pW = response;
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
