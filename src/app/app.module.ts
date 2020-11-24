import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "@routing/app-routing.module";
import {MaterialModule} from "@material/material.module";
import {ItemsModule} from "@items/items.module";
import {MyAccountModule} from "@my-account/my-account.module";
import {AuthenticationModule} from "@authentication/authentication.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "@routing/jwt-interceptor/jwt.interceptor";
import {ConversationModule} from "@conversation/conversation.module";
import {OfferFormComponent} from "@conversation/offer-form/offer-form.component";

/**
 * Main module of the application.
 */
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        AuthenticationModule,
        ConversationModule,
        ItemsModule,
        MyAccountModule,
        HttpClientModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    entryComponents: [
        OfferFormComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
