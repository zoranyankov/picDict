import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IPW } from 'src/app/shared/interfaces/picword-interface';
import { HelpService } from 'src/app/shared/services/help.service';
import { PexelsService } from '../pexels.service';

@Component({
  selector: 'app-find-picword',
  templateUrl: './find-picword.component.html',
  styleUrls: ['./find-picword.component.css']
})
export class FindPicwordComponent implements OnInit {
  picWords: IPW[] = [];
  find: boolean = true;
  constructor(
    private _pexels: PexelsService,
    private _router: Router,
    private _helpService: HelpService,
    ) { }

  ngOnInit(): void {
  }
  onFindSubmit(form:NgForm) {
    let {word} = form.value;
    this._pexels.search(word)
    .subscribe((response: any) => {
      let https: IPW[]= [];
      response.photos.forEach((x: {src: {tiny: string}}) => https.push({word: word, pictureUrl: x.src.tiny}));
      let shuffled = this._helpService.shuffleArray(https);
      this.picWords = https.slice(0,3);
    },
    err => {
    })
  }
  onCopy(pexelWord: IPW) {
    this._pexels.setPexelW(pexelWord);
    this._router.navigateByUrl('/pw/create-picword');
  }
}
