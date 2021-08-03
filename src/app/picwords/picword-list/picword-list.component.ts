import { Component, OnInit } from '@angular/core';
import { IPW } from 'src/app/shared/interfaces/picword-interface';
// import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { PicwordsService } from '../picwords.service';

@Component({
  selector: 'app-picword-list',
  templateUrl: './picword-list.component.html',
  styleUrls: ['./picword-list.component.css']
})
export class PicwordListComponent implements OnInit {
  picWords : IPW[] = [];
  constructor(private _picword: PicwordsService) { }

  ngOnInit(): void {
    this._picword.getAll()
      .subscribe((response: any) => {
        this.picWords = response;
      },
      err => {
        // this.notificate = { type: 'error', messages: err };
      })
  }

}
