import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ItemBrowsingComponent} from './item-browsing/item-browsing.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {OfferComponent} from './offer/offer.component';

const routes: Routes = [
  {path: 'browse-items', component: ItemBrowsingComponent},
  {path: 'my-account', component: MyAccountComponent},
  {path: 'offer', component: OfferComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
