import {NgModule} from '@angular/core';
import {MaterialModule} from '../material/material.module';
import {CommonModule} from '@angular/common';
import {ConversationComponent} from './conversation/conversation.component';
import {ConversationItemDisplayComponent} from './conversation/conversation-item-display/conversation-item-display.component';
import {ConversationMessagesComponent} from './conversation/conversation-messages/conversation-messages.component';
import {ConversationMessageComponent} from './conversation/conversation-messages/conversation-message/conversation-message.component';
import {ConversationOfferComponent} from "./conversation/conversation-messages/conversation-message/conversation-offer/conversation-offer.component";
import { ConversationMessageInputComponent } from './conversation/conversation-messages/conversation-message-input/conversation-message-input.component';

@NgModule({
    declarations: [
        ConversationComponent,
        ConversationItemDisplayComponent,
        ConversationMessagesComponent,
        ConversationMessageComponent,
        ConversationOfferComponent,
        ConversationMessageInputComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class ConversationModule {
}
