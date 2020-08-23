import {dtoStringToStatus as dtoStringToOfferType, OfferType} from "./OfferType";
import {dtoStringToStatus as dtoStringToOfferStatus, OfferStatus} from "./OfferStatus";

export class Offer {
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
    }

    get accepted(): boolean {
        return this.offerStatus == OfferStatus.ACCEPTED;
    }

    get declined(): boolean {
        return this.offerStatus == OfferStatus.DECLINED;
    }

    get cancelled(): boolean {
        return this.offerStatus == OfferStatus.CANCELLED
    }

    get awaiting(): boolean {
        return this.offerStatus == OfferStatus.AWAITING
    }
}

export interface OfferResponse {
    id: number,
    type: string,
    price: number,
    advance: number,
    offerStatus: string,
    contractAddress: string | null
}



