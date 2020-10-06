import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemWantedDescriptionComponent } from "@wanted-by-me/item-wanted-description/item-wanted-description.component";
import { ItemWantedConversationComponent } from "@wanted-by-me/item-wanted-conversation/item-wanted-conversation.component";
import { ItemWantedComponent } from "@wanted-by-me/item-wanted/item-wanted.component";
import { WantedByMeComponent } from "@wanted-by-me/wanted-by-me/wanted-by-me.component";

@NgModule({
    declarations: [
        ItemWantedDescriptionComponent,
        ItemWantedConversationComponent,
        ItemWantedComponent,
        WantedByMeComponent
    ],
    exports: [
        WantedByMeComponent
    ],
    imports: [
        CommonModule
    ]
})
export class WantedByMeModule { }
