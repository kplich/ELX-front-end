import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BrowseItemsComponent} from './browse-items/browse-items.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {PurchaseOfferComponent} from './purchase-offer/purchase-offer.component';

const routes: Routes = [
  {path: 'browse-items', component: BrowseItemsComponent},
  {path: 'my-account', component: MyAccountComponent},
  {path: 'offer', component: PurchaseOfferComponent}
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
