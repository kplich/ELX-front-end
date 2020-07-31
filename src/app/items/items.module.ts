import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemBrowsingComponent} from './item-browsing/item-browsing.component';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ItemComponent} from './item/item.component';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {AddItemComponent} from './add-item/add-item.component';
import {SharedModule} from '../shared/shared.module';
import {ItemCardComponent} from './item-browsing/item-card/item-card.component';
import {ItemBrowsingCriteriaComponent} from './item-browsing/item-browsing-criteria/item-browsing-criteria.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ItemComponent,
    ItemBrowsingComponent,
    ItemBrowsingCriteriaComponent,
    AddItemComponent,
    ItemCardComponent
  ],
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
      MatCarouselModule.forRoot(),
      SharedModule,
      RouterModule,
  ]
})
export class ItemsModule { }
