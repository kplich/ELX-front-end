import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MyAccountComponent} from "@my-account/my-account/my-account.component";
import {MaterialModule} from "@material/material.module";
import {SettingsModule} from "@my-account/settings/settings.module";
import {ItemsSoldComponent} from "@my-account/items-sold/items-sold.component";
import {ItemSoldComponent} from "@my-account/item-sold/item-sold.component";
import {ItemsWantedToSellComponent} from "@my-account/items-wanted-to-sell/items-wanted-to-sell.component";
import {ItemWantedToSellComponent} from "@my-account/item-wanted-to-sell/item-wanted-to-sell.component";
import {ItemsWantedToBuyComponent} from "@my-account/items-wanted-to-buy/items-wanted-to-buy.component";
import {ItemWantedToBuyComponent} from "@my-account/item-wanted-to-buy/item-wanted-to-buy.component";
import {ItemsBoughtComponent} from "@my-account/items-bought/items-bought.component";
import {ItemBoughtComponent} from "@my-account/item-bought/item-bought.component";
import {UserItemDescriptionComponent} from "@my-account/user-item-description/user-item-description.component";
import {UserItemConversationComponent} from "@my-account/user-item-conversation/user-item-conversation.component";
import {UserItemContractPlainAdvanceComponent} from "@my-account/user-item-contract/user-item-contract-plain-advance/user-item-contract-plain-advance.component";
import {UserItemContractDoubleAdvanceComponent} from "@my-account/user-item-contract/user-item-contract-double-advance/user-item-contract-double-advance.component";

/**
 * Module for the page with information about the user.
 */
@NgModule({
    declarations: [
        MyAccountComponent,
        ItemsSoldComponent,
        ItemSoldComponent,
        ItemsWantedToSellComponent,
        ItemWantedToSellComponent,
        ItemsWantedToBuyComponent,
        ItemWantedToBuyComponent,
        ItemsBoughtComponent,
        ItemBoughtComponent,
        UserItemDescriptionComponent,
        UserItemConversationComponent,
        UserItemContractPlainAdvanceComponent,
        UserItemContractDoubleAdvanceComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SettingsModule
    ],
    exports: [
        MyAccountComponent
    ]
})
export class MyAccountModule {
}
