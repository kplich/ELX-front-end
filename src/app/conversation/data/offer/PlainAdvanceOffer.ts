import {Offer, OfferResponse} from "@conversation/data/offer/Offer";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";

export class PlainAdvanceOffer extends Offer {
    advance: number;

    constructor(response: PlainAdvanceOfferResponse) {
        super(response);
        this.advance = response.advance;
    }

    get formattedAdvance(): string {
        return `${this.advance} ${Offer.ETH_SYMBOL}`;
    }

    equals(other: PlainAdvanceOffer): boolean {
        return super.equals(other)
            && this.advance === other.advance;
    }
}

export interface PlainAdvanceOfferResponse extends OfferResponse {
    type: OfferTypeResponseDto.PLAIN_ADVANCE;
    advance: number;
}
