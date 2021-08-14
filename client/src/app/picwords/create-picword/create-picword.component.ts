import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { error, success } from 'src/app/+state/notifyActions';
import { INotificate } from 'src/app/shared/interfaces/notificate-interface';
import { IPWRes } from 'src/app/shared/interfaces/picword-res-interface';
import { IPWCreate } from 'src/app/shared/interfaces/pwCreate-interface';
import { PexelsService } from '../pexels.service';
import { PicwordsService } from '../picwords.service';

@Component({
  selector: 'app-create-picword',
  templateUrl: './create-picword.component.html',
  styleUrls: ['./create-picword.component.css']
})
export class CreatePicwordComponent implements OnInit, OnDestroy {
  
  pexelWord: IPWCreate = {word: '', pictureUrl: ''};
  notificate: INotificate = { type: '', messages: [] }
  pwId: string = '';
  action: string = '';
  buttonName: string = 'Create';
  buttonClass: string = 'btn';

  constructor(
    private _pwService: PicwordsService,
    private _router: Router,
    private _pexels: PexelsService,
    private _activatedRoute: ActivatedRoute,
    private _store: Store,
    ) { }
    
    ngOnInit(): void {
      this.pexelWord = this._pexels.getPexelW();
      this.pwId = this._activatedRoute.snapshot.params.pwId;
      this.action = this._activatedRoute.snapshot.params.action;
      if(this.pwId) {
        this._pwService.getOne(this.pwId)
        .subscribe((response: any) => {
          if (!response) {
            throw new Error('No Data Found!')
          }
          // Format the date
          response.createdAt = response.createdAt.substring(0,10);
          this.pexelWord = response;
          this.buttonName = this.action;
          this.buttonClass = `btn pw-${this.action}`;
          // this.profilePWs = response;
        },
          err => {
            this._store.dispatch(error({ messages: err }));
            // this.notificate = { type: 'error', messages: err };
          })
      }
    }
    
  ngOnDestroy() {
    this._pexels.setPexelW({word:'',pictureUrl:''})
  }
  
  onCreateSubmit(form: NgForm) {
    let { word, picture } = form.value;

    if(this.action == 'Delete') {
      this._pwService.deleteOne(this.pwId)
      .subscribe((response: any) => {
        if (!response || response.errors) {
          // this.notificate = { type: 'error', messages: response.errors };
          throw new Error(response.errors);
        }
        this._store.dispatch(success({ messages: [{message: 'Picword is successfully Deleted'}] }));
        this.notificate = {type: 'message', messages: [{message: 'PW Deleted'}]};
        this._router.navigateByUrl('/auth/profile/picwords');
      },
      err => {
        console.log(err);
        this._store.dispatch(error({ messages: err }));
        this.notificate = { type: 'error', messages: err };
      })
    } else if(this.action == "Edit") {
      this._pwService.editOne(this.pwId, { word: word, pictureUrl: picture })
      .subscribe((response: any) => {
        if (!response || response.errors) {
          // this.notificate = { type: 'error', messages: response.errors };
          throw new Error(response.errors);
        }
        this._store.dispatch(success({ messages: [{message: 'Picword is successfully Edited'}] }));
        this.notificate = {type: 'message', messages: [{message: 'PW Edited'}]};
        this._router.navigateByUrl(`/pw/picword-details/${this.pwId}`);
      },
      err => {
        console.log(err);
        this._store.dispatch(error({ messages: err }));
        this.notificate = { type: 'error', messages: err };
      })
    } else {
      this._pwService.createPW({ word: word, pictureUrl: picture })
      .subscribe((response: any) => {
        if (!response || response.errors) {
          // this.notificate = { type: 'error', messages: response.errors };
          throw new Error(response.errors);
        }
        this._store.dispatch(success({ messages: [{message: 'Picword is successfully Created'}] }));
        this.notificate = {type: 'message', messages: [{message: 'PW Created'}]};
        this._router.navigateByUrl('/auth/profile/picwords');
      },
      err => {
        console.log(err);
        this._store.dispatch(error({ messages: err }));
        this.notificate = { type: 'error', messages: err };
      })
    }
  }
}
