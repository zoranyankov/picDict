import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPW } from 'src/app/shared/interfaces/picword-interface';

@Component({
  selector: 'app-picword',
  templateUrl: './picword.component.html',
  styleUrls: ['./picword.component.css']
})
export class PicwordComponent implements OnInit {
  wrapper: string = 'picword-wrapper';
  findStyle: string = '';

  @Input('picWords') pWs: IPW[];
  @Input('find') inFind: boolean;
  @Input('home') inHome: boolean;
  @Output() onCopy = new EventEmitter<IPW>();

  constructor() { 
    this.pWs = [];
    this.inFind = false;
    this.inHome = false;
  }
  
  ngOnInit(): void {
    this.wrapper = this.inHome ? 'home-wrapper' : 'picword-wrapper';
    this.findStyle = this.inFind ? 'picword-img find' : 'picword-img';
  }
  
  copyLink(pW : IPW) {
    this.onCopy.emit(pW);
  }

}