import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemBrowsingComponent} from './item-browsing.component';
import {ItemBrowsingCriteriaComponent} from './item-browsing-criteria/item-browsing-criteria.component';
import {MaterialModule} from '../material/material.module';

@NgModule({
  declarations: [
    ItemBrowsingComponent,
    ItemBrowsingCriteriaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ItemBrowsingComponent,
    ItemBrowsingCriteriaComponent
  ]
})
export class ItemBrowsingModule { }
