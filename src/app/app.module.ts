import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './routing/app-routing.module';
import {MaterialModule} from './material/material.module';
import {ItemBrowsingModule} from './item-browsing/item-browsing.module';
import {MyAccountModule} from './my-account/my-account.module';
import {OfferModule} from './offer/offer.module';
import {IdentityManagementModule} from './identity-management/identity-management.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    IdentityManagementModule,
    ItemBrowsingModule,
    MyAccountModule,
    OfferModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
