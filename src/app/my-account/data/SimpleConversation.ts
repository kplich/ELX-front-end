import {SimpleUser, SimpleUserResponse} from "@my-account/data/SimpleUser";
import {Offer, OfferResponse} from "@conversation/data/offer/Offer";
import {SimpleMessage, SimpleMessageResponse} from "@my-account/data/SimpleMessage";
import {PlainAdvanceOffer, PlainAdvanceOfferResponse} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer, DoubleAdvanceOfferResponse} from "@conversation/data/offer/DoubleAdvanceOffer";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";

export class SimpleConversation {
    id: number;
    interestedUser: SimpleUser;
    lastMessage: SimpleMessage;
    lastOffer: Offer | undefined;

    constructor(response: SimpleConversationResponse) {
        console.log(response);
        this.id = response.id;
        this.interestedUser = new SimpleUser(response.interestedUser);
        this.lastMessage = new SimpleMessage(response.lastMessage);

        if (response.lastOffer !== null) {
            if (response.lastOffer.type === OfferTypeResponseDto.PLAIN_ADVANCE) {
                this.lastOffer = new PlainAdvanceOffer(response.lastOffer as PlainAdvanceOfferResponse);
            } else if (response.lastOffer.type === OfferTypeResponseDto.DOUBLE_ADVANCE) {
                this.lastOffer = new DoubleAdvanceOffer(response.lastOffer as DoubleAdvanceOfferResponse);
            } else {
                throw new Error("Unknown offer type!");
            }
        }
        else {
            this.lastOffer = undefined;
        }
    }

}

export interface SimpleConversationResponse {
    id: number;
    interestedUser: SimpleUserResponse;
    lastMessage: SimpleMessageResponse;
    lastOffer: OfferResponse | null;
}
