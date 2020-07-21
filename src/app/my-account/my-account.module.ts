import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyAccountComponent} from './my-account.component';
import {MaterialModule} from '../material/material.module';
import {ItemSoldComponent} from './item-sold/item-sold.component';
import {ItemSoldDescriptionComponent} from './item-sold/item-sold-description/item-sold-description.component';
import {ItemSoldOfferComponent} from './item-sold/item-sold-offer/item-sold-offer.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    MyAccountComponent,
    ItemSoldComponent,
    ItemSoldDescriptionComponent,
    ItemSoldOfferComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MyAccountComponent,
    ItemSoldComponent,
    ItemSoldDescriptionComponent,
    ItemSoldOfferComponent
  ]
})
export class MyAccountModule { }
