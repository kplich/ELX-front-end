import {NgModule} from "@angular/core";
import {MaterialModule} from "@material/material.module";
import {CommonModule} from "@angular/common";
import {ConversationComponent} from "@conversation/conversation/conversation.component";
import {ConversationItemDisplayComponent} from "@conversation/item-display/conversation-item-display.component";
import {ConversationMessagesComponent} from "@conversation/messages/conversation-messages.component";
import {ConversationMessageComponent} from "@conversation/message/conversation-message.component";
import {ConversationMessageFormComponent} from "@conversation/message-form/conversation-message-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {OfferFormComponent} from "@conversation/offer-form/offer-form.component";
import {PlainAdvanceOfferComponent} from "@conversation/offer/plain-advance-offer/plain-advance-offer.component";
import {DoubleAdvanceOfferComponent} from "@conversation/offer/double-advance-offer/double-advance-offer.component";

@NgModule({
    declarations: [
        ConversationComponent,
        ConversationItemDisplayComponent,
        ConversationMessagesComponent,
        ConversationMessageComponent,
        PlainAdvanceOfferComponent,
        DoubleAdvanceOfferComponent,
        ConversationMessageFormComponent,
        OfferFormComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ConversationModule {
}
