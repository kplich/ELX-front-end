import {dtoStringToStatus as dtoStringToOfferType, OfferType, OfferTypeDto} from '@conversation/data/OfferType';
import {dtoStringToStatus as dtoStringToOfferStatus, OfferStatus, OfferStatusDto} from '@conversation/data/OfferStatus';

export class Offer {
    public static readonly ETH_SYMBOL = 'Ξ';

    id: number;
    type: OfferType;
    price: number;
    advance: number;
    offerStatus: OfferStatus;
    contractAddress: string | null;

    constructor(response: OfferResponse) {
        this.id = response.id;
        this.type = dtoStringToOfferType(response.type);
        this.price = response.price;
        this.advance = response.advance;
        this.offerStatus = dtoStringToOfferStatus(response.offerStatus);
        this.contractAddress = null;
    }

    get formattedPrice(): string {
        return `${this.price} ${Offer.ETH_SYMBOL}`;
    }

    get formattedAdvance(): string {
        return `${this.advance} ${Offer.ETH_SYMBOL}`;
    }

    get accepted(): boolean {
        return this.offerStatus === OfferStatus.ACCEPTED;
    }

    get declined(): boolean {
        return this.offerStatus === OfferStatus.DECLINED;
    }

    get cancelled(): boolean {
        return this.offerStatus === OfferStatus.CANCELLED;
    }

    get awaiting(): boolean {
        return this.offerStatus === OfferStatus.AWAITING;
    }
}

export interface OfferResponse {
    id: number;
    type: OfferTypeDto;
    price: number;
    advance: number;
    offerStatus: OfferStatusDto;
    contractAddress: string | null;
}



