import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {CategoryResponse} from "@items/data/Item";
import {statusToDtoString, UsedStatus} from "@items/data/UsedStatus";
import {HttpErrorResponse} from "@angular/common/http";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {ItemsService} from "@items/service/items.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";

/**
 * Minimal length of the title.
 */
export const ITEM_TITLE_MINIMUM_LENGTH = 10;

/**
 * Maximal length of the title.
 */
export const ITEM_TITLE_MAXIMUM_LENGTH = 80;

/**
 * Minimal price of an item.
 */
export const ITEM_PRICE_MINIMUM = 0;

/**
 * Maximal price of an item.
 */
export const ITEM_PRICE_MAXIMUM = 100_000_000;

/**
 * Minimal length of a description.
 */
export const ITEM_DESCRIPTION_MINIMUM_LENGTH = 25;

/**
 * Maximal length of a description.
 */
export const ITEM_DESCRIPTION_MAXIMUM_LENGTH = 5000;

/**
 * Maximal number of photos of an item.
 */
export const ITEM_PHOTOS_MAXIMUM_NUMBER = 8;

/**
 * Labels and messages used in the component.
 */
export const STRINGS = {
    formHeader: "Add an item for sale",
    title: {
        label: "Item title",
        required: "Item title is required!",
        tooShort: `Item title must be longer than ${ITEM_TITLE_MINIMUM_LENGTH} characters.`,
        tooLong: `Item title must not be longer than ${ITEM_TITLE_MAXIMUM_LENGTH} characters.`,
        illegalSymbols: "Item title cannot contain following symbols: ! @ # $ ^ * = { } \\ < > ?.",
        hint: `Item title should briefly describe the item sold. Use at least ${ITEM_TITLE_MINIMUM_LENGTH} and at most ${ITEM_TITLE_MAXIMUM_LENGTH} characters.`
    },
    price: {
        label: "Item price",
        required: "Item price is required!",
        negative: "Item price cannot be negative!",
        tooHigh: `Item price cannot be greater than ${ITEM_PRICE_MAXIMUM} Ξ.`,
        hint: "Desired price of item in Ξ with accuracy of 0.0001 Ξ. Amounts smaller than that will get rounded!"
    },
    usedStatus: {
        label: "Item status",
        used: UsedStatus.USED,
        new: UsedStatus.NEW,
        notApplicable: UsedStatus.NOT_APPLICABLE,
        required: "Item status not provided!",
        hint: "Does your item have signs of usage? If yes, select 'Used'."
    },
    category: {
        label: "Item category",
        required: "You must assign a category to the item.",
        hint: "Choose a category that best describes your item."
    },
    description: {
        label: "Item description",
        required: "Item description is required!",
        tooShort: `Item description must be longer than ${ITEM_DESCRIPTION_MINIMUM_LENGTH} characters.`,
        tooLong: `Item description must not be longer than ${ITEM_DESCRIPTION_MAXIMUM_LENGTH} characters.`,
        hint: "Describe in detail the item being sold. Usually, the longer the better, although bear in mind that not everyone might want to read an essay here 😉."
    },
    photos: {
        prompt: `Add up to ${ITEM_PHOTOS_MAXIMUM_NUMBER} photos that show your item. First photo will be a main photo, displayed elsewhere in the site. You can reorder them by dragging or delete altogether.`
    },
    buttonAddItem: "Add item",
    buttonUpdateItem: "Save changes",
    messages: {
        couldNotLoadCategories: "Could not load categories. Load the page again.",
        badRequestData: "Incorrect data were provided!",
        serverError: "An unexpected error occured. Try again."
    }
};

export abstract class ItemEditBaseComponent {

    readonly strings = STRINGS;
    readonly usedStatusValues = {
        used: statusToDtoString(UsedStatus.USED),
        new: statusToDtoString(UsedStatus.NEW),
        notApplicable: statusToDtoString(UsedStatus.NOT_APPLICABLE)
    };
    readonly errorStateMatcher = new MyErrorStateMatcher();
    categories$!: Observable<CategoryResponse[]>;
    protected readonly snackBarService: SnackBarService;
    protected readonly itemsService: ItemsService;
    protected readonly router: Router;
    // language=JSRegexp
    protected readonly itemTitleSymbolsPattern = "^[^!@#$^*={}|\\\\<>?]+$";
    readonly controls = {
        title: new FormControl("", [
            Validators.required,
            Validators.minLength(ITEM_TITLE_MINIMUM_LENGTH),
            Validators.maxLength(ITEM_TITLE_MAXIMUM_LENGTH),
            Validators.pattern(this.itemTitleSymbolsPattern)
        ]),
        price: new FormControl(0, [
            Validators.required,
            Validators.min(ITEM_PRICE_MINIMUM),
            Validators.max(ITEM_PRICE_MAXIMUM)
        ]),
        usedStatus: new FormControl(null, Validators.required),
        category: new FormControl(null, Validators.required),
        description: new FormControl("", [
            Validators.required,
            Validators.minLength(ITEM_DESCRIPTION_MINIMUM_LENGTH),
            Validators.maxLength(ITEM_DESCRIPTION_MAXIMUM_LENGTH)
        ]),
        photoUrls: new FormControl([], Validators.maxLength(ITEM_PHOTOS_MAXIMUM_NUMBER))
    };
    readonly form: FormGroup = new FormGroup(this.controls);

    protected constructor(
        snackBarService: SnackBarService,
        itemsService: ItemsService,
        router: Router) {
        this.snackBarService = snackBarService;
        this.itemsService = itemsService;
        this.router = router;
    }

    get errors() {
        return {
            title: {
                notProvided: this.controls.title.hasError("required"),
                tooShort: () => this.controls.title.hasError("minlength"),
                tooLong: () => this.controls.title.hasError("maxlength"),
                doesntMatchPattern: () => {
                    return !this.errors.title.tooShort() && !this.errors.title.tooLong()
                        && this.controls.title.hasError("pattern");
                }
            },
            price: {
                notProvided: this.controls.price.hasError("required"),
                negative: this.controls.price.hasError("min"),
                tooHigh: this.controls.price.hasError("max")
            },
            status: {
                notProvided: this.controls.usedStatus.hasError("required")
            },
            category: {
                notProvided: this.controls.category.hasError("required")
            },
            description: {
                notProvided: this.controls.description.hasError("required"),
                tooShort: this.controls.description.hasError("minlength"),
                tooLong: this.controls.description.hasError("maxlength")
            },
            formIsInvalid: !this.form.valid
        };
    }

    updatePhotoUrls(event: string[]) {
        this.controls.photoUrls.setValue(event);
    }

    protected openErrorSnackBar(errorResponse: HttpErrorResponse) {
        if (errorResponse.status === 400) {
            this.snackBarService.openSnackBar(STRINGS.messages.badRequestData);
        } else {
            this.snackBarService.openSnackBar(STRINGS.messages.serverError);
        }
    }
}
