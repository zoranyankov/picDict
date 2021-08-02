import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(err:HttpErrorResponse){
    if(!err.error || !err.error.errors) {
      return throwError([{message:'UNKNOWN ERROR'}])
    }else{
      console.log(err);
      console.log(err.error);
      console.log(err.error.errors);
      
      return throwError(err.error.errors)
    }
  }

}
