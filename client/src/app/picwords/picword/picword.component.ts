import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPW } from 'src/app/shared/interfaces/picword-interface';

@Component({
  selector: 'app-picword',
  templateUrl: './picword.component.html',
  styleUrls: ['./picword.component.css']
})
export class PicwordComponent implements OnInit, DoCheck {
  wrapper: string = 'picword-wrapper';
  flagStyle: string = 'loading';

  @Input('picWords') pWs: IPW[];
  @Input('flag') flag: string;
  @Input('title') title: string;
  @Input('home') inHome: boolean;
  @Output() onCopy = new EventEmitter<IPW>();

  constructor() { 
    this.pWs = [];
    this.flag = '';
    this.title = 'Loading...';
    this.inHome = false;
  }
  
  ngOnInit(): void {
    // this.wrapper = this.inHome ? 'home-wrapper' : 'picword-wrapper';
    // this.flagStyle = this.flag ? 'picword-img flag' : 'picword-img';
    if(this.title == 'Loading...' || this.pWs.length == 0) {
      this.flagStyle = 'loading';
    }
  }

  ngDoCheck() {
    if(this.title != 'Loading...') {
      this.flagStyle = this.flag ? 'picword-img flag' : 'picword-img'; 
    }
  }
  
  copyLink(pW : IPW) {
    this.onCopy.emit(pW);
  }

}