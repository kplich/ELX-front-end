import {ItemCategory} from '../../items-service/data/Item';
import {UsedStatus} from '../../items-service/data/UsedStatus';

export interface ItemFilteringCriteria {
    readonly query: string;
    readonly category: ItemCategory;
    readonly statuses: UsedStatus[];
    readonly minimalPrice: number;
    readonly maximalPrice: number;
}
