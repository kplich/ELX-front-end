import {Item, ItemCategory} from '../../items-service/data/Item';
import {UsedStatus} from '../../items-service/data/UsedStatus';

interface ItemFilteringProperties {
    readonly query: string;
    readonly category: ItemCategory;
    readonly statuses: UsedStatus[];
    readonly minimalPrice: number;
    readonly maximalPrice: number;
}

export class ItemFilteringCriteria {
    private readonly query: string;
    private readonly category: ItemCategory;
    private readonly statuses: UsedStatus[];
    private readonly minimalPrice: number;
    private readonly maximalPrice: number;

    constructor(properties: ItemFilteringProperties) {
        this.query = properties.query;
        this.category = properties.category;
        this.statuses = properties.statuses;
        this.minimalPrice = properties.minimalPrice;
        this.maximalPrice = properties.maximalPrice;
    }

    public acceptItem(item: Item): boolean {
        /*console.log(`checking item ${item.id}`);
        console.log(`query? ${this.queryMatches(item)}`);
        console.log(`category? ${this.categoryMatches(item)}`);
        console.log(`statuses? ${this.statusesMatch(item)}`);
        console.log(`price? ${this.priceIsInRange(item)}`);*/

        return this.queryMatches(item)
            && this.categoryMatches(item)
            && this.statusesMatch(item)
            && this.priceIsInRange(item);
    }

    private queryMatches(item: Item): boolean {
        if (this.query === null) {
            return true;
        } else {
            const keywords = this.query.toLowerCase().split(/\s/);
            const titleLower = item.title.toLowerCase();
            const descriptionLower = item.description.toLowerCase();
            return keywords.some(keyword => {
                return titleLower.includes(keyword) || descriptionLower.includes(keyword);
            });
        }
    }

    private categoryMatches(item: Item): boolean {
        if (this.category === null) {
            return true;
        } else {
            return this.category.id === item.category.id;
        }
    }

    private statusesMatch(item: Item): boolean {
        if (this.statuses === null || this.statuses.length === 0) {
            return true;
        } else {
            return this.statuses.some(status => item.usedStatus === status);
        }
    }

    private priceIsInRange(item: Item): boolean {
        const moreThanMinimal = this.minimalPrice !== null ? this.minimalPrice <= item.price : true;
        const lessThanMaximal = this.maximalPrice !== null ? this.maximalPrice >= item.price : true;
        return moreThanMinimal && lessThanMaximal;
    }

}
