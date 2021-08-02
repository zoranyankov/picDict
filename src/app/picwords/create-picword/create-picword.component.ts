import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { INotificate } from 'src/app/shared/interfaces/notificate-interface';
import { PicwordsService } from '../picwords.service';

@Component({
  selector: 'app-create-picword',
  templateUrl: './create-picword.component.html',
  styleUrls: ['./create-picword.component.css']
})
export class CreatePicwordComponent implements OnInit {

  notificate: INotificate = { type: '', messages: [] }
  constructor(private _pwService: PicwordsService) { }

  ngOnInit(): void {
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
      },
      err => {
        console.log(err);

          this.notificate = { type: 'error', messages: err };
        })
  }
}
