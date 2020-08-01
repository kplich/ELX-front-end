export enum UsedStatus {
    NEW = 'New',
    USED = 'Used',
    NOT_APPLICABLE = 'Not applicable'
}

export function statusToDtoString(status: UsedStatus): string {
    switch (status) {
        case UsedStatus.NEW:
            return 'NEW';
        case UsedStatus.USED:
            return 'USED';
        case UsedStatus.NOT_APPLICABLE:
            return 'NOT_APPLICABLE';
    }
}

export function dtoStringToStatus(str: string): UsedStatus | null {
    switch (str) {
        case 'NEW':
            return UsedStatus.NEW;
        case 'USED':
            return UsedStatus.USED;
        case 'NOT_APPLICABLE':
            return UsedStatus.NOT_APPLICABLE;
        default:
            return null;
    }
}
