export enum UsedStatus {
    NEW = 'New',
    USED = 'Used',
    NOT_APPLICABLE = 'Not applicable'
}

export enum UsedStatusDto {
    NEW = 'NEW',
    USED = 'USED',
    NOT_APPLICABLE = 'NOT_APPLICABLE'
}

export function statusToDtoString(status: UsedStatus): UsedStatusDto {
    switch (status) {
        case UsedStatus.NEW:
            return UsedStatusDto.NEW;
        case UsedStatus.USED:
            return UsedStatusDto.USED;
        case UsedStatus.NOT_APPLICABLE:
            return UsedStatusDto.NOT_APPLICABLE;
    }
}

export function dtoStringToStatus(dto: UsedStatusDto): UsedStatus {
    switch (dto) {
        case UsedStatusDto.NEW:
            return UsedStatus.NEW;
        case UsedStatusDto.USED:
            return UsedStatus.USED;
        case UsedStatusDto.NOT_APPLICABLE:
            return UsedStatus.NOT_APPLICABLE;
    }
}
