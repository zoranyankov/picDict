import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPW } from 'src/app/shared/interfaces/picword-interface';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';

@Component({
  selector: 'app-picword',
  templateUrl: './picword.component.html',
  styleUrls: ['./picword.component.css']
})
export class PicwordComponent implements OnInit {
  wrapper: string = 'picword-wrapper';
  flagStyle: string = '';

  @Input('picWords') pWs: IPW[];
  @Input('flag') flag: string;
  @Input('home') inHome: boolean;
  @Output() onCopy = new EventEmitter<IPW>();

  constructor() { 
    this.pWs = [];
    this.flag = '';
    this.inHome = false;
  }
  
  ngOnInit(): void {
    this.wrapper = this.inHome ? 'home-wrapper' : 'picword-wrapper';
    this.flagStyle = this.flag ? 'picword-img flag' : 'picword-img';
  }
  
  copyLink(pW : IPW) {
    this.onCopy.emit(pW);
  }

}