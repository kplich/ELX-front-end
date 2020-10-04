import {OfferTypeRequestDto} from "@conversation/data/OfferType";

export interface NewOfferRequest {
    requestType: OfferTypeRequestDto;
    price: number;
}

export interface NewPlainAdvanceOfferRequest extends NewOfferRequest {
    requestType: OfferTypeRequestDto.PLAIN_ADVANCE;
    advance: number;
}

export interface NewDoubleAdvanceOfferRequest extends NewOfferRequest {
    requestType: OfferTypeRequestDto.DOUBLE_ADVANCE;
}
