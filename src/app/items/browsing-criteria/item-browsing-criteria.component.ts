import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Item, CategoryResponse} from "@items/data/Item";
import {UsedStatus} from "@items/data/UsedStatus";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {ItemFilteringCriteria} from "@items/browsing-criteria/ItemFilteringCriteria";
import {ITEM_PRICE_MAXIMUM, ITEM_PRICE_MINIMUM} from "@items/edit-base/ItemEditBase";

export const SEARCH_BOX_LABEL = "Keywords";
export const SEARCH_BOX_PLACEHOLDER
    = "Enter keywords that describe what you're looking for, e.g. 'book', 'CD', etc...";
export const SEARCH_BOX_QUERY_MAX_LENGTH = 100;
export const SEARCH_QUERY_TOO_LONG_MESSAGE
    = `Search query cannot be longer than ${SEARCH_BOX_QUERY_MAX_LENGTH} characters.`;
export const CATEGORY_LABEL = "Category";
export const EMPTY_CATEGORY_LABEL = "None";
export const STATUS_LABEL = "Status";
export const STATUS_ANY_LABEL = "Any";
export const MINIMAL_PRICE_LABEL = "Minimal price";
export const MAXIMAL_PRICE_LABEL = "Maximal price";
export const MINIMAL_PRICE = ITEM_PRICE_MINIMUM;
export const MAXIMAL_PRICE = ITEM_PRICE_MAXIMUM;
export const BOUNDARY_OUT_OF_RANGE_MESSAGE = "Prices can range from 0 to 100 000 000 Ξ.";
export const MINIMAL_PRICE_GREATER_THAN_MAXIMAL_MESSAGE =
    "Minimal price should be smaller than maximal price. Prices given won't be used to filter items.";

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

    readonly strings = {
        searchBox: {
            label: SEARCH_BOX_LABEL,
            placeholder: SEARCH_BOX_PLACEHOLDER,
            queryTooLong: SEARCH_QUERY_TOO_LONG_MESSAGE
        },
        category: {
            label: CATEGORY_LABEL,
            emptyCategoryLabel: EMPTY_CATEGORY_LABEL
        },
        status: {
            label: STATUS_LABEL,
            statusUsedLabel: UsedStatus.USED,
            statusNewLabel: UsedStatus.NEW,
            statusAnyLabel: STATUS_ANY_LABEL,
        },
        price: {
            ethereumSymbol: Item.ETH_SYMBOL,
            minimalPriceLabel: MINIMAL_PRICE_LABEL,
            maximalPriceLabel: MAXIMAL_PRICE_LABEL,
            boundaryOutOfRange: BOUNDARY_OUT_OF_RANGE_MESSAGE,
            minimalGreaterThanMaximal: MINIMAL_PRICE_GREATER_THAN_MAXIMAL_MESSAGE
        }
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
