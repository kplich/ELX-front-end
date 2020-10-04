import {Component, Inject} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {OFFER_TYPES, OfferTypePair, OfferTypeRequestDto} from "@conversation/data/OfferType";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {Item} from "@items/data/Item";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NewDoubleAdvanceOfferRequest, NewPlainAdvanceOfferRequest} from "@conversation/data/NewOfferRequest";

export function advanceRequiredIfPlainAdvance(formGroup: AbstractControl): ValidationErrors | null {
    const typeInput = formGroup.get("type");
    const advanceInput = formGroup.get("advance");

    if (typeInput === null || advanceInput === null) {
        throw new Error("form controls not found");
    }

    if (typeInput.value === OfferTypeRequestDto.PLAIN_ADVANCE) {
        return advanceInput.value === null ? { advanceRequired: true } : null;
    }
    else {
        return null;
    }
}

export function advanceNoGreaterThanPrice(formGroup: AbstractControl): ValidationErrors | null {
    const priceInput = formGroup.get("price");
    const advanceInput = formGroup.get("advance");

    if (priceInput === null || advanceInput === null) {
        throw new Error("form controls not found");
    }

    if (priceInput.value === null || advanceInput.value === null) {
        return null;
    }

    const price = Number(priceInput.value);
    const advance = Number(advanceInput.value);

    if (isNaN(price) || isNaN(advance)) {
        return {
            nan: true
        };
    }

    console.log(`${price} >= ${advance} ? ${price >= advance}`);

    if (price >= advance) {
        return null;
    } else {
        return {
            advanceGreaterThanPrice: true
        };
    }
}

export const STRINGS = {
    formTitle: "Your offer",
    ethereumSymbol: Item.ETH_SYMBOL,
    price: {
        label: "Price",
        errors: {
            notProvided: "Price is required!",
            isNegative: "Price cannot be negative!"
        }
    },
    advance: {
        label: "Advance",
        errors: {
            notProvided: "Advance is required!",
            isNegative: "Advance cannot be negative!"
        }
    },
    type: {
        label: "Type",
        errors: {
            notProvided: "Offer type is required!"
        }
    },
    formErrors: {
        advanceIsGreaterThanPrice: "Advance cannot be greater than price!"
    },
    buttons: {
        delete: "Delete offer",
        cancel: "Cancel editing",
        save: "Save offer"
    }
};

@Component({
    selector: "app-offer-form",
    templateUrl: "./offer-form.component.html",
    styleUrls: ["./offer-form.component.scss"]
})
export class OfferFormComponent {

    readonly strings = STRINGS;
    readonly offerTypes: OfferTypePair[] = OFFER_TYPES;
    readonly errorStateMatcher = new MyErrorStateMatcher();
    readonly controls = {
        price: new FormControl(null, [
            Validators.required,
            Validators.min(0)
        ]),
        advance: new FormControl(null, [
            Validators.min(0)
        ]),
        type: new FormControl(null, Validators.required)
    };
    readonly form = new FormGroup(this.controls, [
        advanceNoGreaterThanPrice,
        advanceRequiredIfPlainAdvance
    ]);
    readonly errors = {
        price: {
            notProvided: this.controls.price.hasError("required"),
            isNegative: this.controls.price.hasError("min")
        },
        advance: {
            notProvided: this.controls.advance.hasError("required"),
            isNegative: this.controls.advance.hasError("min")
        },
        type: {
            notProvided: this.controls.type.hasError("required")
        },
        advanceIsGreaterThanPrice: this.form.hasError("advanceGreaterThanPrice"),
        advanceRequiredIfPlainAdvance: this.form.hasError("advanceRequired")
    };

    constructor(@Inject(MAT_DIALOG_DATA) data: NewPlainAdvanceOfferRequest | NewDoubleAdvanceOfferRequest | null) {
        if (data !== null) {
            this.controls.advance
                .setValue(data.requestType === OfferTypeRequestDto.PLAIN_ADVANCE ? data.advance : null);
            this.controls.price.setValue(data.price);
            this.controls.type.setValue(data.requestType);
        }
    }

    get request(): NewPlainAdvanceOfferRequest | NewDoubleAdvanceOfferRequest {
        switch (this.controls.type.value as OfferTypeRequestDto) {
            case OfferTypeRequestDto.PLAIN_ADVANCE: {
                return {
                    requestType: OfferTypeRequestDto.PLAIN_ADVANCE,
                    price: parseFloat(this.controls.price.value),
                    advance: parseFloat(this.controls.advance.value)
                };
            }
            case OfferTypeRequestDto.DOUBLE_ADVANCE: {
                return {
                    requestType: OfferTypeRequestDto.DOUBLE_ADVANCE,
                    price: parseFloat(this.controls.price.value),
                };
            }
        }
    }

    get typeIsPlainAdvance(): boolean {
        return this.controls.type.value === OfferTypeRequestDto.PLAIN_ADVANCE;
    }
}
