import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ItemBrowsingComponent} from '../items/item-browsing/item-browsing.component';
import {MyAccountComponent} from '../my-account/my-account/my-account.component';
import {OfferComponent} from '../offer/offer/offer.component';
import {LoggingInComponent} from '../identity-management/logging-in/logging-in.component';
import {RegistrationComponent} from '../identity-management/registration/registration.component';
import {LoggedInGuard} from './logged-in-guard/logged-in.guard';
import {ItemComponent} from '../items/item/item.component';
import {AddItemComponent} from '../items/add-item/add-item.component';

const routes: Routes = [
  {path: 'log-in', component: LoggingInComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'add-item', component: AddItemComponent},
  {path: 'items', component: ItemBrowsingComponent},
  {path: 'items/:id', component: ItemComponent},
  {path: 'my-account', component: MyAccountComponent, canActivate: [LoggedInGuard]},
  {path: 'offer', component: OfferComponent, canActivate: [LoggedInGuard]},
  {path: '', component: ItemBrowsingComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
