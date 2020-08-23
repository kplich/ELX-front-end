import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationItemDisplayComponent } from './conversation/conversation-item-display/conversation-item-display.component';
import { ConversationMessagesComponent } from './conversation/conversation-messages/conversation-messages.component';
import { ConversationMessageComponent } from './conversation/conversation-messages/conversation-message/conversation-message.component';

@NgModule({
  declarations: [
      ConversationComponent,
      ConversationItemDisplayComponent,
      ConversationMessagesComponent,
      ConversationMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConversationModule { }
