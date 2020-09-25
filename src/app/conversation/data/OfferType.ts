export enum OfferType {
    PLAIN_ADVANCE = "Plain advance",
    DOUBLE_ADVANCE = "Double advance"
}

export enum OfferTypeDto {
    PLAIN_ADVANCE = "PLAIN_ADVANCE",
    DOUBLE_ADVANCE = "DOUBLE_ADVANCE"
}

export function statusToDtoString(status: OfferType): OfferTypeDto {
    switch (status) {
        case OfferType.PLAIN_ADVANCE: return OfferTypeDto.PLAIN_ADVANCE;
        case OfferType.DOUBLE_ADVANCE: return OfferTypeDto.DOUBLE_ADVANCE;
    }
}

export function dtoStringToStatus(str: OfferTypeDto): OfferType {
    switch (str) {
        case OfferTypeDto.PLAIN_ADVANCE: return OfferType.PLAIN_ADVANCE;
        case OfferTypeDto.DOUBLE_ADVANCE: return OfferType.DOUBLE_ADVANCE;
    }
}
