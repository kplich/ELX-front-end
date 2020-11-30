export enum OfferStatus {
    AWAITING = "Awaiting",
    CANCELLED = "Cancelled",
    ACCEPTED = "Accepted",
    DECLINED = "Declined"
}

export enum OfferStatusDto {
    AWAITING = "AWAITING",
    CANCELLED = "CANCELLED",
    ACCEPTED = "ACCEPTED",
    DECLINED = "DECLINED"
}

export function offerStatusToDto(status: OfferStatus): OfferStatusDto {
    switch (status) {
        case OfferStatus.AWAITING: return OfferStatusDto.AWAITING;
        case OfferStatus.CANCELLED: return OfferStatusDto.CANCELLED;
        case OfferStatus.ACCEPTED: return OfferStatusDto.ACCEPTED;
        case OfferStatus.DECLINED: return OfferStatusDto.DECLINED;
    }
}

export function dtoToOfferStatus(str: OfferStatusDto): OfferStatus {
    switch (str) {
        case OfferStatusDto.AWAITING: return OfferStatus.AWAITING;
        case OfferStatusDto.CANCELLED: return OfferStatus.CANCELLED;
        case OfferStatusDto.ACCEPTED: return OfferStatus.ACCEPTED;
        case OfferStatusDto.DECLINED: return OfferStatus.DECLINED;
    }
}
