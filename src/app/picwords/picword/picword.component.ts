import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPW } from 'src/app/shared/interfaces/picword-interface';

@Component({
  selector: 'app-picword',
  templateUrl: './picword.component.html',
  styleUrls: ['./picword.component.css']
})
export class PicwordComponent implements OnInit {
  @Input('picWords') pWs: IPW[];
  @Input('find') inFind: boolean;
  @Output() onCopy = new EventEmitter<IPW>();

  constructor() { 
    this.pWs = [];
    this.inFind = false;
  }

  ngOnInit(): void {
  }
  
  copyLink(pW : IPW) {
    this.onCopy.emit(pW);
  }

}