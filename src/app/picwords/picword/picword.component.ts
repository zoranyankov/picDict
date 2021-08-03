import { Component, Input, OnInit } from '@angular/core';
import { IPW } from 'src/app/shared/interfaces/picword-interface';

@Component({
  selector: 'app-picword',
  templateUrl: './picword.component.html',
  styleUrls: ['./picword.component.css']
})
export class PicwordComponent implements OnInit {
  @Input('picWords') pWs: IPW[];
  constructor() { 
    this.pWs = [];
  }

  ngOnInit(): void {
  }

}