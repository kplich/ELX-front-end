import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {BrowseItemsComponent} from './browse-items/browse-items.component';
import {RoutingModule} from './routing.module';
import {SearchContainerComponent} from './browse-items/search-box/search-container.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseItemsComponent,
    SearchContainerComponent
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
