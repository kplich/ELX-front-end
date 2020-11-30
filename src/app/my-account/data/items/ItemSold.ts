import {Offer, OfferResponse} from "@conversation/data/offer/Offer";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";
import {PlainAdvanceOffer, PlainAdvanceOfferResponse} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer, DoubleAdvanceOfferResponse} from "@conversation/data/offer/DoubleAdvanceOffer";
import {AbstractUserItem, AbstractUserItemResponse} from "@my-account/data/items/AbstractUserItem";

export class ItemSold extends AbstractUserItem {

    offer: Offer;

    constructor(response: ItemSoldResponse) {
        super(response);

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

    equals(other: ItemSold): boolean {
        return super.equals(other)
            && this.offer.equals(other.offer);
    }
}

export interface ItemSoldResponse extends AbstractUserItemResponse {
    offer: OfferResponse;
}
