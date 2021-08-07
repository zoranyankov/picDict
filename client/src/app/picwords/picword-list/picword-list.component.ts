import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
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
  picWords: IPW[] | undefined;
  toggle: number = 6;
  // pWCount: number = 6;

  constructor(
    private _picword: PicwordsService,
    private _helpService: HelpService,
    // private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // let userId = this._activatedRoute.snapshot.params.userId;
    // console.log(userId);
    this.picWords = undefined;

    this._picword.getAll()
      .subscribe((response: any) => {
        let shuffle = this._helpService.shuffleArray(response);
        shuffle = shuffle.slice(0, 6);

        // Convert IPWRes to IPW
        shuffle = shuffle.map(x => ({ _id: x._id, word: x.word, pictureUrl: x.pictureUrl }));
        console.log(shuffle);
        this.picWords = shuffle;
      },
        err => {
          // this.notificate = { type: 'error', messages: err };
        })
  }

  toggleView(pws: number) {
    console.log(pws);
    this.toggle = pws;
  }

}
