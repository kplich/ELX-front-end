export enum OfferType {
    PLAIN_ADVANCE = "Plain advance",
    DOUBLE_ADVANCE = "Double advance"
}

export enum OfferTypeRequestDto {
    PLAIN_ADVANCE = ".NewPlainAdvanceOfferRequest",
    DOUBLE_ADVANCE = ".NewDoubleAdvanceOfferRequest"
}

export function typeToRequestDto(type: OfferType): OfferTypeRequestDto {
    switch (type) {
        case OfferType.PLAIN_ADVANCE:
            return OfferTypeRequestDto.PLAIN_ADVANCE;
        case OfferType.DOUBLE_ADVANCE:
            return OfferTypeRequestDto.DOUBLE_ADVANCE;
    }
}

export function requestDtoToType(str: OfferTypeRequestDto): OfferType {
    switch (str) {
        case OfferTypeRequestDto.PLAIN_ADVANCE:
            return OfferType.PLAIN_ADVANCE;
        case OfferTypeRequestDto.DOUBLE_ADVANCE:
            return OfferType.DOUBLE_ADVANCE;
    }
}

// ---------------------------------------------------------

export enum OfferTypeResponseDto {
    PLAIN_ADVANCE = ".PlainAdvanceOfferResponse",
    DOUBLE_ADVANCE = ".DoubleAdvanceOfferResponse"
}

export function typeToResponseDto(type: OfferType): OfferTypeResponseDto {
    switch (type) {
        case OfferType.PLAIN_ADVANCE:
            return OfferTypeResponseDto.PLAIN_ADVANCE;
        case OfferType.DOUBLE_ADVANCE:
            return OfferTypeResponseDto.DOUBLE_ADVANCE;
    }
}

export function responseDtoToType(str: OfferTypeResponseDto): OfferType {
    switch (str) {
        case OfferTypeResponseDto.PLAIN_ADVANCE:
            return OfferType.PLAIN_ADVANCE;
        case OfferTypeResponseDto.DOUBLE_ADVANCE:
            return OfferType.DOUBLE_ADVANCE;
    }
}

export interface OfferTypePair {
    type: OfferType;
    requestDto: OfferTypeRequestDto;
}

export const OFFER_TYPES: OfferTypePair[] = [
    {type: OfferType.PLAIN_ADVANCE, requestDto: OfferTypeRequestDto.PLAIN_ADVANCE},
    {type: OfferType.DOUBLE_ADVANCE, requestDto: OfferTypeRequestDto.DOUBLE_ADVANCE}
];

