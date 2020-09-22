import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MyAccountComponent} from "@my-account/my-account/my-account.component";
import {MaterialModule} from "@material/material.module";
import {ItemSoldComponent} from "@my-account/item-sold/item-sold.component";
import {ItemSoldDescriptionComponent} from "@my-account/item-sold-description/item-sold-description.component";
import {ItemSoldOfferComponent} from "@my-account/item-sold-offer/item-sold-offer.component";
import {SettingsComponent} from "@my-account/my-account/settings/settings.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ChangePasswordComponent} from "@my-account/my-account/settings/change-password/change-password.component";

@NgModule({
  declarations: [
      MyAccountComponent,
      ItemSoldComponent,
      ItemSoldDescriptionComponent,
      ItemSoldOfferComponent,
      SettingsComponent,
      ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MyAccountComponent,
    ItemSoldComponent,
    ItemSoldDescriptionComponent,
    ItemSoldOfferComponent
  ]
})
export class MyAccountModule { }
