import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPW } from 'src/app/shared/interfaces/picword-interface';
import { HelpService } from 'src/app/shared/services/help.service';
// import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { PicwordsService } from '../picwords.service';

@Component({
  selector: 'app-picword-list',
  templateUrl: './picword-list.component.html',
  styleUrls: ['./picword-list.component.css']
})
export class PicwordListComponent implements OnInit {
  picWords: IPW[] = [];

  constructor(
    private _picword: PicwordsService,
    private _helpService: HelpService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let userId = this._activatedRoute.snapshot.params.userId;
    console.log(userId);
    
    if (userId) {
      // query.subscribe((uId: string) => {
      //   userId = uId;
      // })
      console.log(userId);
      this._picword.getAll()
        .subscribe((response: any) => {
          let shuffle = this._helpService.shuffleArray(response);
          this.picWords = shuffle.slice(0, 6);
        },
          err => {
            // this.notificate = { type: 'error', messages: err };
          })
    } else {
      this._picword.getAll()
        .subscribe((response: any) => {
          let shuffle = this._helpService.shuffleArray(response);
          this.picWords = shuffle.slice(0, 6);
        },
          err => {
            // this.notificate = { type: 'error', messages: err };
          })
    }
  }

}
