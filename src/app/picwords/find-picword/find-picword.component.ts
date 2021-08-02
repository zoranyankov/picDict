import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-find-picword',
  templateUrl: './find-picword.component.html',
  styleUrls: ['./find-picword.component.css']
})
export class FindPicwordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onFindSubmit(form:NgForm) {
    let {word} = form.value;
    console.log(word);
  }
}
