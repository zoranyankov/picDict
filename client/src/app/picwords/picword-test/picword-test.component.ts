import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { error, success } from 'src/app/+state/notifyActions';
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
  totalResults: IAnswer[] = [];
  showResult: boolean = false;
  displayResults: boolean = false;
  totalScore: number = 0;
  creatorId: string = '';
  disableAnswers: boolean = false;
  loading: boolean = false;

  // Set test length
  initialPWs = 10;


  constructor(
    private _picword: PicwordsService,
    private _help: HelpService,
    private _auth: AuthService,
    private _result: ResultService,
    private _store: Store,
  ) { }

  ngOnInit(): void {
    this.picWords = [];
    this.creatorId = this._auth.getLoggedUserId();
    this.getWords();   
  }

  getWords () {
    this.loading = true;
    this._picword.getAll()
    .subscribe((response: any) => {
      // Convert IPWRes to IPW
      response = response.map((x: IPWRes) => ({ _id: x._id, word: x.word, pictureUrl: x.pictureUrl }));
      response = this._help.shuffleArray(response);
      this.loading = false;
      this.picWords = response.slice(0, this.initialPWs);
      this.allAnswers = this.picWords.reduce((a: string[], x) => {
        a.push(x.word);
        return a;
      }, []) //.map(x => x.toLocaleLowerCase());
      this.currentPW = this.picWords.shift();
      this.currentAnswers = this.allAnswers.filter(x => x != this.currentPW?.word);
      this.currentAnswers = this._help.shuffleArray(this.currentAnswers).slice(0, 2).concat(this.currentPW!.word);
      this.currentAnswers = this._help.shuffleArray(this.currentAnswers);
    },
      err => {
        this._store.dispatch(error({ messages: err }));
      })
  }

  checkAnswer(e: any) {
    this.disableAnswers = false;
    let currentChoise = this.currentPW!.word == e.innerHTML
    if(currentChoise) {
      this.totalScore ++;
    }

    // Compose the current result
    let currentResult: IAnswer = {
      wrongAnswers: [...this.currentAnswers],
      pictureUrl: this.currentPW!.pictureUrl,
      correctAnswer: this.currentPW!.word,
      selectedAnswer: e.innerHTML!,
      result: currentChoise,
    };
    this.totalResults.push(currentResult);
    // Display current result
    this.showResult = true;
    // Disable more than 1 answer click 
    this.disableAnswers = true;
    e.classList.add('wrong');
  }

  nextWord() {
    this.showResult = true;
    this.disableAnswers = false;
    //Reset the classnames
    document.querySelectorAll('button.picword-name').forEach(el => el.className = 'picword-name')
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
    console.log('inShowResults');
    
    this.displayResults = true;
    this._result.add({ creatorId: this.creatorId, userResults: this.totalResults, score: this.totalScore })
    .subscribe({error: (err) => {
      console.log(err);
      this._store.dispatch(error({ messages: err }));
    }});
    this._store.dispatch(success({ messages: [{message: `You have finished with ${this.totalScore} correct answers`}] }));
  }

  restart() {
    this.picWords = []
    this.getWords();
  }
}
