import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ItemBrowsingComponent} from "@items/browsing/item-browsing.component";
import {MyAccountComponent} from "@my-account/my-account/my-account.component";
import {OfferComponent} from "../offer/offer/offer.component";
import {LoggingInComponent} from "@authentication/logging-in/logging-in.component";
import {RegistrationComponent} from "@authentication/registration/registration.component";
import {LoggedInGuard} from "@routing/logged-in-guard/logged-in.guard";
import {ItemComponent} from "@items/item/item.component";
import {AddItemComponent} from "@items/add/add-item.component";
import {UpdateItemComponent} from "@items/update-item/update-item.component";
import {ConversationComponent} from "@conversation/conversation/conversation.component";

const routes: Routes = [
    {path: "log-in", component: LoggingInComponent},
    {path: "register", component: RegistrationComponent},
    {path: "items", component: ItemBrowsingComponent},
    {path: "items/add", component: AddItemComponent, canActivate: [LoggedInGuard]},
    {path: "items/:id/edit", component: UpdateItemComponent, canActivate: [LoggedInGuard]},
    {path: "items/:id", component: ItemComponent},
    {path: "items/:id/conversation", component: ConversationComponent},
    {path: "my-account", component: MyAccountComponent, canActivate: [LoggedInGuard]},
    {path: "offer", component: OfferComponent, canActivate: [LoggedInGuard]},
    {path: "", component: ItemBrowsingComponent}
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
