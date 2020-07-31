import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Item, ItemCategory} from '../../items-service/data/Item';
import {UsedStatus} from '../../items-service/data/UsedStatus';
import {ITEM_PRICE_MAXIMUM, ITEM_PRICE_MINIMUM} from '../../add-item/add-item.component';
import {MyErrorStateMatcher} from '../../../shared/MyErrorStateMatcher';
import {ItemFilteringCriteria} from './ItemFilteringCriteria';

export const SEARCH_BOX_LABEL = 'Keywords';
export const SEARCH_BOX_PROMPT = 'Enter keywords that describe what you\'re looking for, e.g. \'book\', \'CD\', etc...';
export const SEARCH_BOX_QUERY_MAX_LENGTH = 100;
export const SEARCH_QUERY_TOO_LONG_MESSAGE = `Search query cannot be longer than ${SEARCH_BOX_QUERY_MAX_LENGTH} characters.`;
export const CATEGORY_LABEL = 'Category';
export const EMPTY_CATEGORY_LABEL = 'None';
export const STATUS_LABEL = 'Status';
export const STATUS_ANY_LABEL = 'Any';
export const MINIMAL_PRICE_LABEL = 'Minimal price';
export const MAXIMAL_PRICE_LABEL = 'Maximal price';
export const MINIMAL_PRICE = ITEM_PRICE_MINIMUM;
export const MAXIMAL_PRICE = ITEM_PRICE_MAXIMUM;
export const BOUNDARY_OUT_OF_RANGE_MESSAGE = 'Prices can range from 0 to 100 000 000 Ξ.';
export const MINIMAL_PRICE_GREATER_THAN_MAXIMAL_MESSAGE =
    'Minimal price should be smaller than maximal price. Prices given won\'t be used to filter items.';
export const FILTER_LABEL = 'Filter';

export function minimalPriceSmallerThanMaximalPriceValidator(formGroup: FormGroup) {
    const minimalPriceInput = formGroup.get('minimalPrice');
    const maximalPriceInput = formGroup.get('maximalPrice');

    if (minimalPriceInput.value === null || maximalPriceInput.value === null) {
        return null;
    }

    return minimalPriceInput.value < maximalPriceInput.value
        ? null
        : {priceRangeInvalid: true};
}

@Component({
    selector: 'item-browsing-criteria',
    templateUrl: './item-browsing-criteria.component.html',
    styleUrls: ['./item-browsing-criteria.component.scss']
})
export class ItemBrowsingCriteriaComponent implements OnInit {

    readonly strings = {
        searchBoxLabel: SEARCH_BOX_LABEL,
        searchBoxPrompt: SEARCH_BOX_PROMPT,
        searchQueryTooLong: SEARCH_QUERY_TOO_LONG_MESSAGE,
        categoryLabel: CATEGORY_LABEL,
        emptyCategoryLabel: EMPTY_CATEGORY_LABEL,
        statusLabel: STATUS_LABEL,
        statusUsedLabel: UsedStatus.USED,
        statusNewLabel: UsedStatus.NEW,
        statusAnyLabel: STATUS_ANY_LABEL,
        ethereumSymbol: Item.ETH_SYMBOL,
        minimalPrice: MINIMAL_PRICE_LABEL,
        maximalPrice: MAXIMAL_PRICE_LABEL,
        priceBoundaryOutOfRangeMessage: BOUNDARY_OUT_OF_RANGE_MESSAGE,
        minimalPriceGreaterThanMaximalMessage: MINIMAL_PRICE_GREATER_THAN_MAXIMAL_MESSAGE,
        filterLabel: FILTER_LABEL
    };

    readonly controls = {
        query: new FormControl(null, Validators.maxLength(SEARCH_BOX_QUERY_MAX_LENGTH)),
        category: new FormControl(null),
        status: new FormControl(null),
        minimalPrice: new FormControl(null, [
            Validators.min(MINIMAL_PRICE),
            Validators.max(MAXIMAL_PRICE)
        ]),
        maximalPrice: new FormControl(null, [
            Validators.min(MINIMAL_PRICE),
            Validators.max(MAXIMAL_PRICE)
        ])
    };

    readonly criteriaForm: FormGroup = new FormGroup(
        this.controls, [minimalPriceSmallerThanMaximalPriceValidator]);

    readonly errorStateMatcher = new MyErrorStateMatcher();

    @Input() categories: ItemCategory[];

    @Output() filteringCriteria = new EventEmitter<ItemFilteringCriteria>();

    constructor() {
    }

    get errors() {
        return {
            queryTooLong: this.controls.query.hasError('maxlength'),
            minimalPriceOutOfRange: this.controls.minimalPrice.hasError('min')
                || this.controls.minimalPrice.hasError('max'),
            maximalPriceOutOfRange: this.controls.maximalPrice.hasError('min')
                || this.controls.maximalPrice.hasError('max'),
            minimalPriceGreaterThanMaximalPrice: this.criteriaForm.hasError('priceRangeInvalid')
        };
    }

    ngOnInit() {
    }

    emitFilteringCriteria() {
        const usedStatuses = [UsedStatus.NOT_APPLICABLE];

        if (this.controls.status.value !== null) {
            usedStatuses.push(this.controls.status.value);
        }

        const filteringCriteria = {
            query: this.controls.query.valid ? this.controls.query.value : undefined,
            category: this.controls.category.value,
            statuses: usedStatuses,
            minimalPrice: this.controls.minimalPrice.valid
            && !this.errors.minimalPriceGreaterThanMaximalPrice
                ? this.controls.minimalPrice.value : undefined,
            maximalPrice: this.controls.maximalPrice.valid
            && !this.errors.minimalPriceGreaterThanMaximalPrice
                ? this.controls.maximalPrice.value : undefined
        };

        console.log(filteringCriteria);
        console.log(this.criteriaForm);
        this.filteringCriteria.emit(filteringCriteria);
    }
}
