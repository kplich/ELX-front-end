import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {BrowseItemsComponent} from './browse-items/browse-items.component';
import {RoutingModule} from './routing.module';
import {SearchContainerComponent} from './browse-items/search-box/search-container.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SoldByMeComponent } from './sold-by-me/sold-by-me.component';
import { SoldByMeDescriptionComponent } from './sold-by-me/sold-by-me-description/sold-by-me-description.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseItemsComponent,
    SearchContainerComponent,
    MyAccountComponent,
    SoldByMeComponent,
    SoldByMeDescriptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
