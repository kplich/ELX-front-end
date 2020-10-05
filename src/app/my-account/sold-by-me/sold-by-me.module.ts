import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ItemSoldComponent} from "@my-account/sold-by-me/item-sold/item-sold.component";
import {ItemSoldDescriptionComponent} from "@my-account/sold-by-me/item-sold-description/item-sold-description.component";
import {ItemSoldConversationComponent} from "@sold-by-me/item-sold-conversation/item-sold-conversation.component";
import { SoldByMeComponent } from "./sold-by-me/sold-by-me.component";
import {MaterialModule} from "@material/material.module";

@NgModule({
    declarations: [
        ItemSoldComponent,
        ItemSoldDescriptionComponent,
        ItemSoldConversationComponent,
        SoldByMeComponent
    ],
    imports: [
        MaterialModule,
        CommonModule
    ],
    exports: [
        SoldByMeComponent
    ]
})
export class SoldByMeModule {
}
