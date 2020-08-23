export enum OfferStatus {
    AWAITING = "Awaiting",
    CANCELLED = "Cancelled",
    ACCEPTED = "Accepted",
    DECLINED = "Declined"
}

export function statusToDtoString(status: OfferStatus): string {
    switch (status) {
        case OfferStatus.AWAITING: return 'AWAITING';
        case OfferStatus.CANCELLED: return 'CANCELLED';
        case OfferStatus.ACCEPTED: return 'ACCEPTED';
        case OfferStatus.DECLINED: return 'DECLINED';
    }
}

export function dtoStringToStatus(str: string): OfferStatus | null {
    switch (str) {
        case 'AWAITING': return OfferStatus.AWAITING;
        case 'CANCELLED': return OfferStatus.CANCELLED;
        case 'ACCEPTED': return OfferStatus.ACCEPTED;
        case 'DECLINED': return OfferStatus.DECLINED;
        default: return null;
    }
}
