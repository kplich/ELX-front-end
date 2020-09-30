import {OfferTypeRequestDto} from "@conversation/data/OfferType";

export interface NewOfferRequest {
    requestType: OfferTypeRequestDto;
    price: number;
    advance: number;
}
