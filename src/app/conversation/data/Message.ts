import {Offer, OfferResponse} from "@conversation/data/offer/Offer";
import {SimpleUser, SimpleUserResponse} from "@my-account/data/SimpleUser";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";
import {PlainAdvanceOffer, PlainAdvanceOfferResponse} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer, DoubleAdvanceOfferResponse} from "@conversation/data/offer/DoubleAdvanceOffer";

export class Message {
    id: number;
    sendingUser: SimpleUser;
    sentOn: Date;
    textContent: string;
    offer: Offer | null;

    constructor(response: MessageResponse) {
        this.id = response.id;
        this.sendingUser = new SimpleUser(response.sendingUser);
        this.sentOn = new Date(response.sentOn);
        this.textContent = response.textContent;

        if (response.offer) {
            switch (response.offer.type) {
                case OfferTypeResponseDto.PLAIN_ADVANCE: {
                    this.offer = new PlainAdvanceOffer(response.offer as PlainAdvanceOfferResponse);
                    break;
                }
                case OfferTypeResponseDto.DOUBLE_ADVANCE: {
                    this.offer = new DoubleAdvanceOffer(response.offer as DoubleAdvanceOfferResponse);
                }
            }
        }
        else {
            this.offer = null;
        }
    }

    get senderId(): number {
        return this.sendingUser.id;
    }

    get hasOffer(): boolean {
        return this.offer !== null;
    }

    get offerIsPlainAdvance(): boolean {
        if (this.offer) {
            return this.offer instanceof PlainAdvanceOffer;
        }
        else {
            return false;
        }
    }

    get offerIsDoubleAdvance(): boolean {
        if (this.offer) {
            return this.offer instanceof DoubleAdvanceOffer;
        }
        else {
            return false;
        }
    }
}

export interface MessageResponse {
    id: number;
    sendingUser: SimpleUserResponse;
    sentOn: string;
    textContent: string;
    offer: OfferResponse | null;
}
