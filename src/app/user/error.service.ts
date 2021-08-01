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
      return throwError('UNKNOWN')
    }else{
      return throwError(err.error.errors[0].message)
    }
  }

}
