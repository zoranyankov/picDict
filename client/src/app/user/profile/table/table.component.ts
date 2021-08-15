import { Component, Input, OnInit } from '@angular/core';
import { IResultRes } from 'src/app/shared/interfaces/result-response-interface';
import { IResults } from 'src/app/shared/interfaces/results-interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() current!: IResultRes;
  @Input() totalScore!: string;
  toShow: IResults[] = [];

  constructor() { 
  }
  
  ngOnInit(): void {
    this.toShow = this.current.userResults;
    console.log(this.toShow);
  }

}
