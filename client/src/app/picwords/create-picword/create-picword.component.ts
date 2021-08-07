import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  buttonClass: string = 'button';

  constructor(
    private _pwService: PicwordsService,
    private _router: Router,
    private _pexels: PexelsService,
    private _activatedRoute: ActivatedRoute,
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
          console.log(response);
          // Format the date
          response.createdAt = response.createdAt.substring(0,10);
          this.pexelWord = response;
          this.buttonName = this.action;
          this.buttonClass = `button pw-${this.action}`;
          // this.profilePWs = response;
        },
          err => {
            // this.notificate = { type: 'error', messages: err };
          })
      }
    }
    
  ngOnDestroy() {
    this._pexels.setPexelW({word:'',pictureUrl:''})
  }
  
  onCreateSubmit(form: NgForm) {
    let { word, picture } = form.value;
    console.log(word, picture);

    if(this.action == 'Delete') {
      this._pwService.deleteOne(this.pwId)
      .subscribe((response: any) => {
        console.log(response);
        if (!response || response.errors) {
          // this.notificate = { type: 'error', messages: response.errors };
          throw new Error(response.errors);
        }
        this.notificate = {type: 'message', messages: [{message: 'PW Created'}]};
        this._router.navigateByUrl('/auth/profile/picwords');
      },
      err => {
        console.log(err);
        
        this.notificate = { type: 'error', messages: err };
      })
    } else if(this.action == "Edit") {
      this._pwService.editOne(this.pwId, { word: word, pictureUrl: picture })
      .subscribe((response: any) => {
        console.log(response);
        if (!response || response.errors) {
          // this.notificate = { type: 'error', messages: response.errors };
          throw new Error(response.errors);
        }
        this.notificate = {type: 'message', messages: [{message: 'PW Created'}]};
        this._router.navigateByUrl(`/pw/picword-details/${this.pwId}`);
      },
      err => {
        console.log(err);
        
        this.notificate = { type: 'error', messages: err };
      })
    } else {
      this._pwService.createPW({ word: word, pictureUrl: picture })
      .subscribe((response: any) => {
        console.log();
        if (!response || response.errors) {
          // this.notificate = { type: 'error', messages: response.errors };
          throw new Error(response.errors);
        }
        this.notificate = {type: 'message', messages: [{message: 'PW Created'}]};
        this._router.navigateByUrl('/auth/profile/picwords');
      },
      err => {
        console.log(err);
        
        this.notificate = { type: 'error', messages: err };
      })
    }
  }
}
