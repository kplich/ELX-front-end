import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ItemBrowsingComponent} from './item-browsing/item-browsing.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {OfferComponent} from './offer/offer.component';
import {LoggingInComponent} from './identity-management/logging-in/logging-in.component';
import {RegistrationComponent} from './identity-management/registration/registration.component';
import {LoggedInGuard} from './shared/logged-in-guard/logged-in.guard';

const routes: Routes = [
  {path: 'log-in', component: LoggingInComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'browse-items', component: ItemBrowsingComponent},
  {path: 'my-account', component: MyAccountComponent, canActivate: [LoggedInGuard]},
  {path: 'offer', component: OfferComponent, canActivate: [LoggedInGuard]}
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
