import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { IPW } from '../interfaces/picword-interface';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor() { }


  // Handle back-end errors
  handleError(err: HttpErrorResponse) {
    if (!err.error || !err.error.errors) {
      return throwError([{ message: 'UNKNOWN ERROR' }])
    } else {
      return throwError(err.error.errors)
    }
  }


  //Function to mix the answers (questions)
  shuffleArray(array: IPW[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
