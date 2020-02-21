import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RoutingModule} from './routing.module';
import {MaterialModule} from './material/material.module';
import {ItemBrowsingModule} from './item-browsing/item-browsing.module';
import {MyAccountModule} from './my-account/my-account.module';
import {OfferModule} from './offer/offer.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,
    ItemBrowsingModule,
    MyAccountModule,
    OfferModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
