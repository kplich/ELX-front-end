import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Item, CategoryResponse} from "@items/data/Item";
import {UsedStatus} from "@items/data/UsedStatus";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {ItemFilteringCriteria} from "@items/browsing-criteria/ItemFilteringCriteria";
import {ITEM_PRICE_MAXIMUM, ITEM_PRICE_MINIMUM} from "@items/edit-base/ItemEditBase";

/**
 * Maximal length of a search query.
 */
export const SEARCH_BOX_QUERY_MAX_LENGTH = 100;

/**
 * Labels and strings used in the component.
 */
export const STRINGS = {
    searchBox: {
        label: "Keywords",
        placeholder: "Enter keywords that describe what you're looking for, e.g. 'book', 'CD', etc...",
        queryTooLong: `Search query cannot be longer than ${SEARCH_BOX_QUERY_MAX_LENGTH} characters.`
    },
    category: {
        label: "Category",
        emptyCategoryLabel: "None"
    },
    status: {
        label: "Status",
        statusUsedLabel: UsedStatus.USED,
        statusNewLabel: UsedStatus.NEW,
        statusAnyLabel: "Any",
    },
    price: {
        ethereumSymbol: Item.ETH_SYMBOL,
        minimalPriceLabel: "Minimal price",
        maximalPriceLabel: "Maximal price",
        boundaryOutOfRange: "Prices can range from 0 to 100 000 000 Ξ.",
        minimalGreaterThanMaximal: "Minimal price should be smaller than maximal price. Prices given won't be used to filter items."
    }
};

/**
 * Valudator function that checks if the minimal price is smaller than the maximal price.
 */
export function minimalPriceSmallerThanMaximalPriceValidator(formGroup: AbstractControl): ValidationErrors | null {
    const minimalPriceInput = formGroup.get("minimalPrice");
    const maximalPriceInput = formGroup.get("maximalPrice");

    if (minimalPriceInput === null || maximalPriceInput === null) {
        throw new Error("form controls not found");
    }

    if (minimalPriceInput.value === null || maximalPriceInput.value === null) {
        return null;
    }

    return minimalPriceInput.value < maximalPriceInput.value
        ? null
        : {advanceGreaterThanPrice: true};
}

@Component({
    selector: "item-browsing-criteria",
    templateUrl: "./item-browsing-criteria.component.html",
    styleUrls: ["./item-browsing-criteria.component.scss"]
})
export class ItemBrowsingCriteriaComponent {

    readonly strings = STRINGS;

    readonly controls = {
        query: new FormControl(null, Validators.maxLength(SEARCH_BOX_QUERY_MAX_LENGTH)),
        category: new FormControl(null),
        status: new FormControl(null),
        minimalPrice: new FormControl(null, [
            Validators.min(ITEM_PRICE_MINIMUM),
            Validators.max(ITEM_PRICE_MAXIMUM)
        ]),
        maximalPrice: new FormControl(null, [
            Validators.min(ITEM_PRICE_MINIMUM),
            Validators.max(ITEM_PRICE_MAXIMUM)
        ])
    };

    readonly criteriaForm: FormGroup = new FormGroup(this.controls, [minimalPriceSmallerThanMaximalPriceValidator]);

    readonly errorStateMatcher = new MyErrorStateMatcher();

    @Input() categories!: CategoryResponse[];

    @Output() filteringCriteria = new EventEmitter<ItemFilteringCriteria>();

    constructor() {}

    get errors() {
        return {
            queryTooLong: this.controls.query.hasError("maxlength"),
            minimalPriceOutOfRange: this.controls.minimalPrice.hasError("min")
                || this.controls.minimalPrice.hasError("max"),
            maximalPriceOutOfRange: this.controls.maximalPrice.hasError("min")
                || this.controls.maximalPrice.hasError("max"),
            minimalPriceGreaterThanMaximalPrice: this.criteriaForm.hasError("priceRangeInvalid")
        };
    }

    private get minimalPriceIsValid(): boolean {
        return this.controls.minimalPrice.valid
            && !this.errors.minimalPriceGreaterThanMaximalPrice;
    }

    private get maximalPriceIsValid(): boolean {
        return this.controls.maximalPrice.valid
            && !this.errors.minimalPriceGreaterThanMaximalPrice;
    }

    emitFilteringCriteria() {
        const usedStatuses = [];

        if (this.controls.status.value !== null) {
            usedStatuses.push(UsedStatus.NOT_APPLICABLE);
            usedStatuses.push(this.controls.status.value);
        }

        const filteringProperties = {
            query: this.controls.query.valid ? this.controls.query.value : null,
            category: this.controls.category.value,
            statuses: usedStatuses,
            minimalPrice: this.minimalPriceIsValid
                ? this.controls.minimalPrice.value : null,
            maximalPrice: this.maximalPriceIsValid
                ? this.controls.maximalPrice.value : null
        };

        console.log(filteringProperties);
        this.filteringCriteria.emit(new ItemFilteringCriteria(filteringProperties));
    }
}
