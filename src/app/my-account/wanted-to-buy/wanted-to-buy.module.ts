import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {WantedToBuyComponent} from "@wanted-to-buy/wanted-to-buy/wanted-to-buy.component";
import {ItemWantedToBuyComponent} from "@wanted-to-buy/item-wanted-to-buy/item-wanted-to-buy.component";
import {ItemWantedToBuyConversationComponent} from "@wanted-to-buy/item-wanted-to-buy-conversation/item-wanted-to-buy-conversation.component";
import {ItemWantedToBuyDescriptionComponent} from "@wanted-to-buy/item-wanted-to-buy-description/item-wanted-to-buy-description.component";

@NgModule({
    declarations: [
        ItemWantedToBuyDescriptionComponent,
        ItemWantedToBuyConversationComponent,
        ItemWantedToBuyComponent,
        WantedToBuyComponent
    ],
    exports: [
        WantedToBuyComponent
    ],
    imports: [
        CommonModule
    ]
})
export class WantedToBuyModule { }
