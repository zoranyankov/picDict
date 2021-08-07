import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicwordComponent } from './picword/picword.component';
import { FindPicwordComponent } from './find-picword/find-picword.component';
import { CreatePicwordComponent } from './create-picword/create-picword.component';
import { PicwordDetailsComponent } from './picword-details/picword-details.component';
import { PicwordsRoutingModule } from './picword-routing.module';
import { PicwordListComponent } from './picword-list/picword-list.component';
import { FormsModule } from '@angular/forms';
import { PicwordsService } from './picwords.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PicwordComponent,
    FindPicwordComponent,
    CreatePicwordComponent,
    PicwordDetailsComponent,
    PicwordListComponent,
  ],
  imports: [
    CommonModule,
    PicwordsRoutingModule,
    FormsModule,
    SharedModule
  ],  
  exports: [
    PicwordComponent
  ],
  providers: [
    PicwordsService
  ]
})
export class PicwordsModule { }
