import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicwordComponent } from './picword/picword.component';
import { FindPicwordComponent } from './find-picword/find-picword.component';
import { CreatePicwordComponent } from './create-picword/create-picword.component';
import { EditPicwordComponent } from './edit-picword/edit-picword.component';
import { PicwordDetailsComponent } from './picword-details/picword-details.component';
import { PicwordsRoutingModule } from './picword-routing.module';
import { PicwordListComponent } from './picword-list/picword-list.component';


@NgModule({
  declarations: [
    PicwordComponent,
    FindPicwordComponent,
    CreatePicwordComponent,
    EditPicwordComponent,
    PicwordDetailsComponent,
    PicwordListComponent
  ],
  imports: [
    CommonModule,
    PicwordsRoutingModule
  ],  
  exports: [
    PicwordComponent
  ]
})
export class PicwordsModule { }
