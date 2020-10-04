import {
    OfferTypeResponseDto
} from "@conversation/data/OfferType";
import {dtoToOfferStatus, OfferStatus, OfferStatusDto} from "@conversation/data/OfferStatus";

export abstract class Offer {
    public static readonly ETH_SYMBOL = "Ξ";

    id: number;
    price: number;
    offerStatus: OfferStatus;
    contractAddress: string | null;

    protected constructor(response: OfferResponse) {
        this.id = response.id;
        this.price = response.price;
        this.offerStatus = dtoToOfferStatus(response.offerStatus);
        this.contractAddress = null;
    }

    get formattedPrice(): string {
        return `${this.price} ${Offer.ETH_SYMBOL}`;
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
    type: OfferTypeResponseDto;
    price: number;
    offerStatus: OfferStatusDto;
    contractAddress: string | null;
}



