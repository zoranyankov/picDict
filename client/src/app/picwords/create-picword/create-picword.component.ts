import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { INotificate } from 'src/app/shared/interfaces/notificate-interface';
import { IPW } from 'src/app/shared/interfaces/picword-interface';
import { PexelsService } from '../pexels.service';
import { PicwordsService } from '../picwords.service';

@Component({
  selector: 'app-create-picword',
  templateUrl: './create-picword.component.html',
  styleUrls: ['./create-picword.component.css']
})
export class CreatePicwordComponent implements OnInit, OnDestroy {
  pexelWord: IPW = {word: '', pictureUrl: ''};
  notificate: INotificate = { type: '', messages: [] }
  constructor(
    private _pwService: PicwordsService,
    private _router: Router,
    private _pexels: PexelsService
    ) { }

  ngOnInit(): void {
    this.pexelWord = this._pexels.getPexelW();
  }

  ngOnDestroy() {
    this._pexels.setPexelW({word:'',pictureUrl:''})
  }
  
  onCreateSubmit(form: NgForm) {
    let { word, picture } = form.value;
    console.log(word, picture);
    this._pwService.createPW({ word: word, pictureUrl: picture })
      .subscribe((response: any) => {
        console.log();
        if (!response || response.errors) {
          // this.notificate = { type: 'error', messages: response.errors };
          throw new Error(response.errors);
        }
        this.notificate = {type: 'message', messages: [{message: 'PW Created'}]};
        this._router.navigateByUrl('/pw/picwords');
      },
      err => {
        console.log(err);

          this.notificate = { type: 'error', messages: err };
        })
  }
}
