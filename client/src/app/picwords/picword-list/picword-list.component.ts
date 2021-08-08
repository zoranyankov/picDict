import { Component, OnInit } from '@angular/core';
import { IPW } from 'src/app/shared/interfaces/picword-interface';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { PicwordsService } from '../picwords.service';

@Component({
  selector: 'app-picword-list',
  templateUrl: './picword-list.component.html',
  styleUrls: ['./picword-list.component.css']
})
export class PicwordListComponent implements OnInit {
  picWords: IPW[] = [];
  currentPWs: IPW[] = [];
  toggle: number = 6;

  constructor(
    private _picword: PicwordsService,
  ) { }

  ngOnInit(): void {
    this.picWords = [];

    this._picword.getAll()
      .subscribe((response: any) => {
        // Convert IPWRes to IPW
        response = response.map((x: IPWRes) => ({ _id: x._id, word: x.word, pictureUrl: x.pictureUrl }));
        console.log(response);
        this.picWords = response;
        this.currentPWs = response.slice(0, 6);
      },
        err => {
          // this.notificate = { type: 'error', messages: err };
        })
  }

  toggleView(pws: number) {
    this.toggle = pws;
    this.currentPWs = this.picWords?.slice(0, this.toggle);
  }

  showPrev(){
    let length = this.picWords.length;
    this.currentPWs = this.picWords.splice(length - this.toggle, length);
    this.picWords = this.currentPWs.concat(this.picWords);
  }
  showNext(){
    let pastPWs = this.picWords.splice(0, this.toggle);
    this.picWords = this.picWords.concat(pastPWs);
    this.currentPWs = this.picWords.slice(0,this.toggle);
  }

}
