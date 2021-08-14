import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { error } from 'src/app/+state/notifyActions';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { PicwordsService } from '../picwords.service';

@Component({
  selector: 'app-picword-details',
  templateUrl: './picword-details.component.html',
  styleUrls: ['./picword-details.component.css']
})
export class PicwordDetailsComponent implements OnInit {
  pW: IPWRes | undefined;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _picword: PicwordsService,
    private _store: Store,
  ) { }

  ngOnInit(): void {
    let pwId = this._activatedRoute.snapshot.params.pwId;
    this._picword.getOne(pwId)
    .subscribe((response: any) => {
      this.pW = response;
    },
      err => {
        this._store.dispatch(error({ messages: err }));
      })
  }

}
