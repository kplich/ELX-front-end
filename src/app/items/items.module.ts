import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemBrowsingComponent} from './item-browsing/item-browsing.component';
import {ItemBrowsingCriteriaComponent} from './item-browsing-criteria/item-browsing-criteria.component';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ItemComponent} from './item/item.component';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {AddItemComponent} from './add-item/add-item.component';

@NgModule({
  declarations: [
    ItemComponent,
    ItemBrowsingComponent,
    ItemBrowsingCriteriaComponent,
    AddItemComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        MatCarouselModule.forRoot()
    ]
})
export class ItemsModule { }
