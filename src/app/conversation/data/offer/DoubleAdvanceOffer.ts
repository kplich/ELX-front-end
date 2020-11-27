import {Offer, OfferResponse} from "@conversation/data/offer/Offer";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";

export class DoubleAdvanceOffer extends Offer {
    constructor(response: DoubleAdvanceOfferResponse) {
        super(response);
    }

    equals(other: DoubleAdvanceOffer): boolean {
        return super.equals(other);
    }
}

export interface DoubleAdvanceOfferResponse extends OfferResponse {
    type: OfferTypeResponseDto.DOUBLE_ADVANCE;
}
