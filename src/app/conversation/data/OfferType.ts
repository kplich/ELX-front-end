export enum OfferType {
    PLAIN_ADVANCE = 'Plain advance'
}

export enum OfferTypeDto {
    PLAIN_ADVANCE = 'PLAIN_ADVANCE'
}

export function statusToDtoString(status: OfferType): OfferTypeDto {
    switch (status) {
        case OfferType.PLAIN_ADVANCE: return OfferTypeDto.PLAIN_ADVANCE;
    }
}

export function dtoStringToStatus(str: OfferTypeDto): OfferType {
    switch (str) {
        case OfferTypeDto.PLAIN_ADVANCE: return OfferType.PLAIN_ADVANCE;
    }
}
