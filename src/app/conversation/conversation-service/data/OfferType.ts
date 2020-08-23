export enum OfferType {
    PLAIN_ADVANCE = "Plain advance"
}

export function statusToDtoString(status: OfferType): string {
    switch (status) {
        case OfferType.PLAIN_ADVANCE: return 'PLAIN_ADVANCE';
    }
}

export function dtoStringToStatus(str: string): OfferType | null {
    switch (str) {
        case 'PLAIN_ADVANCE': return OfferType.PLAIN_ADVANCE;
        default: return null;
    }
}
