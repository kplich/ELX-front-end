import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfferComponent} from './offer.component';
import {OfferConversationComponent} from './offer-conversation/offer-conversation.component';
import {OfferConversationMessageComponent} from './offer-conversation/offer-conversation-message/offer-conversation-message.component';
import {MaterialModule} from '../material/material.module';

@NgModule({
  declarations: [
    OfferComponent,
    OfferConversationComponent,
    OfferConversationMessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    OfferComponent,
    OfferConversationComponent,
    OfferConversationMessageComponent
  ]
})
export class OfferModule { }
