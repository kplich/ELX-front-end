import {Component, Inject} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {OfferTypeDto} from "@conversation/data/OfferType";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {Item} from "@items/data/Item";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export function advanceNoGreaterThanPrice(formGroup: AbstractControl): ValidationErrors | null {
    const priceInput = formGroup.get("price");
    const advanceInput = formGroup.get("advance");

    if (priceInput === null || advanceInput === null) {
        throw new Error("form controls not found");
    }

    if (priceInput.value === null || advanceInput.value === null) {
        return null;
    }

    const price = parseFloat(priceInput.value);
    const advance = parseFloat(advanceInput.value);

    console.log(`${price} >= ${advance} ? ${price >= advance}`);

    if (price >= advance) {
        return null;
    } else {
        return {
            advanceGreaterThanPrice: true
        };
    }
}

export interface NewOfferRequest {
    type: OfferTypeDto;
    price: number;
    advance: number;
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
    readonly errorStateMatcher = new MyErrorStateMatcher();
    readonly controls = {
        price: new FormControl(null, [
            Validators.required,
            Validators.min(0)
        ]),
        advance: new FormControl(null, [
            Validators.required,
            Validators.min(0)
        ]),
        type: new FormControl(null, Validators.required)
    };
    readonly form = new FormGroup(this.controls, [advanceNoGreaterThanPrice]);
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
        advanceIsGreaterThanPrice: this.form.hasError("advanceGreaterThanPrice")
    };

    constructor(@Inject(MAT_DIALOG_DATA) data: NewOfferRequest | null) {
        if (data !== null) {
            this.controls.advance.setValue(data.advance);
            this.controls.price.setValue(data.price);
            this.controls.type.setValue(data.type);
        }
    }

    get request(): NewOfferRequest {
        return {
            type: this.controls.type.value,
            price: parseFloat(this.controls.price.value),
            advance: parseFloat(this.controls.advance.value)
        };
    }
}
