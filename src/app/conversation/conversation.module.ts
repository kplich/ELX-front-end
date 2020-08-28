import {NgModule} from '@angular/core';
import {MaterialModule} from '@material/material.module';
import {CommonModule} from '@angular/common';
import {ConversationComponent} from '@conversation/conversation/conversation.component';
import {ConversationItemDisplayComponent} from '@conversation/item-display/conversation-item-display.component';
import {ConversationMessagesComponent} from '@conversation/messages/conversation-messages.component';
import {ConversationMessageComponent} from '@conversation/message/conversation-message.component';
import {ConversationOfferComponent} from '@conversation/offer/conversation-offer.component';
import {ConversationMessageFormComponent} from '@conversation/message-form/conversation-message-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        ConversationComponent,
        ConversationItemDisplayComponent,
        ConversationMessagesComponent,
        ConversationMessageComponent,
        ConversationOfferComponent,
        ConversationMessageFormComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ConversationModule {
}
