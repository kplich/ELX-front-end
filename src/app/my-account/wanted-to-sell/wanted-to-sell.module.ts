import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@material/material.module";
import {ItemWantedToSellComponent} from "@wanted-to-sell/item-wanted-to-sell/item-wanted-to-sell.component";
import {ItemWantedToSellConversationComponent} from "@wanted-to-sell/item-wanted-to-sell-conversation/item-wanted-to-sell-conversation.component";
import {WantedToSellComponent} from "@wanted-to-sell/wanted-to-sell/wanted-to-sell.component";
import {ItemWantedToSellDescriptionComponent} from "@wanted-to-sell/item-wanted-to-sell-description/item-wanted-to-sell-description.component";

@NgModule({
    declarations: [
        ItemWantedToSellComponent,
        ItemWantedToSellDescriptionComponent,
        ItemWantedToSellConversationComponent,
        WantedToSellComponent
    ],
    imports: [
        MaterialModule,
        CommonModule
    ],
    exports: [
        WantedToSellComponent
    ]
})
export class WantedToSellModule {
}
