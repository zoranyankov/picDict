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
  title: string = 'COPY PEXEL';
  currentPWs: IPW[] = []

  constructor(
    private _pexels: PexelsService,
    private _router: Router,
    private _helpService: HelpService,
  ) { }

  ngOnInit(): void {
  }
  onFindSubmit(form: NgForm) {
    console.log('submitting');
    this.title = 'Loading...';
    this.currentPWs = [{ _id: '1', 'word': 'Loading...', pictureUrl: 'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' }];
    let { word } = form.value;
    this._pexels.search(word)
      .subscribe((response: any) => {
        let https: IPW[] = [];
        this.title = 'COPY PEXEL';

        // Destructuring PEXELS response
        response.photos.forEach((x: { id: string, src: { tiny: string } }) => https.push({ _id: x.id, word: word, pictureUrl: x.src.tiny }));
        let shuffled = this._helpService.shuffleArray(https);
        this.picWords = shuffled;
        this.currentPWs = this.picWords.slice(0, 3);
      },
        err => {
        })
  }

  moreSubmit() {
    // Loop the initial array
    let pastPWs = this.picWords.splice(0, 3);
    this.currentPWs = this.picWords.slice(0,3);
    this.picWords = this.picWords.concat(pastPWs);
  }

  onCopy(pexelWord: IPW) {
    this._pexels.setPexelW(pexelWord);
    this._router.navigateByUrl('/pw/create-picword');
  }
}
