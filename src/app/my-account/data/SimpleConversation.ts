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
        } else {
            this.lastOffer = undefined;
        }
    }

    get interestedUserId(): number {
        return this.interestedUser.id;
    }

    equals(other: SimpleConversation): boolean {
        const simpleConditions = this.id === other.id
            && this.interestedUser.equals(other.interestedUser)
            && this.lastMessage.equals(other.lastMessage);
        if (simpleConditions) {
            if (this.lastOffer !== undefined) {
                if (other.lastOffer !== undefined) {
                    return this.lastOffer.equals(other.lastOffer);
                } else {
                    return false;
                }
            } else {
                return other.lastOffer === undefined;
            }
        } else {
            return false;
        }
    }
}

export interface SimpleConversationResponse {
    id: number;
    interestedUser: SimpleUserResponse;
    lastMessage: SimpleMessageResponse;
    lastOffer: OfferResponse | null;
}
