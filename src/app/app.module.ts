import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './routing/app-routing.module';
import {MaterialModule} from './material/material.module';
import {ItemsModule} from './items/items.module';
import {MyAccountModule} from './my-account/my-account.module';
import {OfferModule} from './offer/offer.module';
import {IdentityManagementModule} from './identity-management/identity-management.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './routing/jwt-interceptor/jwt.interceptor';

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
    ItemsModule,
    MyAccountModule,
    OfferModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
