import { Component, OnInit } from '@angular/core';
import { IAnswer } from 'src/app/shared/interfaces/answer-interface';
import { IPW } from 'src/app/shared/interfaces/picword-interface';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { HelpService } from 'src/app/shared/services/help.service';
import { AuthService } from 'src/app/user/auth.service';
import { PicwordsService } from '../picwords.service';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-picword-test',
  templateUrl: './picword-test.component.html',
  styleUrls: ['./picword-test.component.css'],
})
export class PicwordTestComponent implements OnInit {
  picWords!: IPW[];
  currentPW: IPW | undefined = undefined; //{_id: '', word: '', pictureUrl: ''};
  allAnswers: string[] = [];
  currentAnswers: string[] = [];
  toggle: number = 6;
  counter: number = 0;
  showResult: boolean = false;
  displayResults: boolean = false;
  totalResults: IAnswer[] = [];
  currentTestPWs: IPW[] = [];
  totalScore: number = 0;
  creatorId: string = '';

  constructor(
    private _picword: PicwordsService,
    private _help: HelpService,
    private _auth: AuthService,
    private _result: ResultService
  ) { }

  ngOnInit(): void {
    this.picWords = [];
    this.creatorId = this._auth.getLoggedUserId();

    this._picword.getAll()
      .subscribe((response: any) => {
        // Convert IPWRes to IPW
        response = response.map((x: IPWRes) => ({ _id: x._id, word: x.word, pictureUrl: x.pictureUrl }));
        console.log(response);
        response = this._help.shuffleArray(response);
        this.picWords = response.slice(0, 10);
        this.allAnswers = this.picWords.reduce((a: string[], x) => {
          a.push(x.word);
          return a;
        }, []) //.map(x => x.toLocaleLowerCase());
        this.currentTestPWs = [...this.picWords];
        this.currentPW = this.picWords.shift();
        this.currentAnswers = this.allAnswers.filter(x => x != this.currentPW?.word);
        this.currentAnswers = this._help.shuffleArray(this.currentAnswers).slice(0, 2).concat(this.currentPW!.word);
        this.currentAnswers = this._help.shuffleArray(this.currentAnswers);
      },
        err => {
          // this.notificate = { type: 'error', messages: err };
        })
  }

  checkAnswer(e: any) {

    // Compose the current result
    let currentResult: IAnswer = {
      wrongAnswers: [...this.currentAnswers],
      pictureUrl: this.currentPW!.pictureUrl,
      correctAnswer: this.currentPW!.word,
      selectedAnswer: e.innerHTML!,
      result: this.currentPW!.word == e.innerHTML,
    };
    this.totalResults.push(currentResult);
    this.showResult = true;
    console.log(e);

    let alEl = document.querySelectorAll('h5');
    alEl.forEach((el: HTMLHeadingElement) => el.removeEventListener('mouseclick', this.checkAnswer, true));
    e.classList.add('wrong');
  }

  nextWord() {
    //Reset the classnames
    document.querySelectorAll('h5').forEach(el => el.className = 'picword-name')
    // Get the next picword
    this.currentPW = undefined;
    this.currentAnswers = [];
    this.showResult = false;
    this.currentPW = this.picWords.shift();
    this.currentAnswers = this.allAnswers.filter(x => x != this.currentPW?.word);
    this.currentAnswers = this._help.shuffleArray(this.currentAnswers).slice(0, 2).concat(this.currentPW!.word);
    this.currentAnswers = this._help.shuffleArray(this.currentAnswers);
  }


  showResults() {
    this.totalScore = this.totalResults.reduce((a, x) => {
      if (x.result) {
        a++
      }
      return a;
    }, 0)
    this.displayResults = true;
    this._result.add({ creatorId: this.creatorId, userResults: this.totalResults, score: this.totalScore })
    .subscribe({error: (err) => console.log(err)});
  }
}
