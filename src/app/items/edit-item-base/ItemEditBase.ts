import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../shared/MyErrorStateMatcher';
import {ItemCategory} from '../items-service/data/Item';
import {statusToDtoString, UsedStatus} from '../items-service/data/UsedStatus';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {ItemsService} from '../items-service/items.service';
import {Router} from '@angular/router';

export const ADD_ITEM_FORM_HEADER = 'Add an item for sale';

export const ITEM_TITLE_LABEL = 'Item title';
export const ITEM_TITLE_REQUIRED_MESSAGE = 'Item title is required!';
export const ITEM_TITLE_MINIMUM_LENGTH = 10;
export const ITEM_TITLE_MAXIMUM_LENGTH = 80;
export const ITEM_TITLE_TOO_SHORT_MESSAGE = `Item title must be longer than ${ITEM_TITLE_MINIMUM_LENGTH} characters.`;
export const ITEM_TITLE_TOO_LONG_MESSAGE = `Item title must not be longer than ${ITEM_TITLE_MAXIMUM_LENGTH} characters.`;
export const ITEM_TITLE_ILLEGAL_SYMBOLS_MESSAGE = 'Item title cannot contain following symbols: ! @ # $ ^ * = { } \\ < > ?.';
export const ITEM_TITLE_HINT = `Item title should briefly describe the item sold. Use at least ${ITEM_TITLE_MINIMUM_LENGTH} and at most ${ITEM_TITLE_MAXIMUM_LENGTH} characters.`;

export const ITEM_PRICE_LABEL = 'Item price';
export const ITEM_PRICE_REQUIRED_MESSAGE = 'Item price is required!';
export const ITEM_PRICE_MINIMUM = 0;
export const ITEM_PRICE_MAXIMUM = 100_000_000;
export const ITEM_PRICE_NEGATIVE_MESSAGE = 'Item price cannot be negative!';
export const ITEM_PRICE_TOO_HIGH_MESSAGE = `Item price cannot be greater than ${ITEM_PRICE_MAXIMUM} Ξ.`;
export const ITEM_PRICE_HINT = 'Desired price of item in Ξ with accuracy of 0.0001 Ξ (around 0.02 €). Amounts smaller than that will get rounded!';

export const ITEM_USED_STATUS_LABEL = 'Item status';
export const ITEM_USED_LABEL = UsedStatus.USED;
export const ITEM_NEW_LABEL = UsedStatus.NEW;
export const ITEM_NOT_APPLICABLE_LABEL = UsedStatus.NOT_APPLICABLE;
export const ITEM_USED_STATUS_NOT_PROVIDED_MESSAGE = 'Item status not provided!';
export const ITEM_USED_STATUS_HINT = 'Does your item have signs of usage? If yes, select \'Used\'.';

export const ITEM_CATEGORY_LABEL = 'Item category';
export const ITEM_CATEGORY_REQUIRED_MESSAGE = 'You must assign a category to the item.';
export const ITEM_CATEGORY_HINT = 'Choose a category that best describes your item.';

export const ITEM_DESCRIPTION_LABEL = 'Item description';
export const ITEM_DESCRIPTION_REQUIRED_MESSAGE = 'Item description is required!';
export const ITEM_DESCRIPTION_MINIMUM_LENGTH = 25;
export const ITEM_DESCRIPTION_MAXIMUM_LENGTH = 5000;
export const ITEM_DESCRIPTION_TOO_SHORT_MESSAGE = `Item description must be longer than ${ITEM_DESCRIPTION_MINIMUM_LENGTH} characters.`;
export const ITEM_DESCRIPTION_TOO_LONG_MESSAGE = `Item description must not be longer than ${ITEM_DESCRIPTION_MAXIMUM_LENGTH} characters.`;
export const ITEM_DESCRIPTION_HINT = 'Describe in detail the item being sold. Usually, the longer the better, although bear in mind that not everyone might want to read an essay here 😉.';

export const ITEM_PHOTOS_ADD_PROMPT = 'Add up to 8 photos that show your item. First photo will be a main photo, displayed elsewhere in the site. You can reorder them by dragging or delete altogether.';
export const ITEM_PHOTOS_MAXIMUM_NUMBER = 8;

export const COULD_NOT_LOAD_CATEGORIES_MESSAGE = 'Could not load categories. Load the page again.';
export const BAD_REQUEST_DATA_MESSAGE = 'Incorrect data were provided!';
export const SERVER_ERROR_MESSAGE = 'An unexpected error occured. Try again.';

export const BUTTON_ADD_ITEM_TEXT = 'Add item';
export const BUTTON_UPDATE_ITEM_TEXT = 'Save changes';

export abstract class ItemEditBaseComponent {

    public readonly strings = {
        formHeader: ADD_ITEM_FORM_HEADER,
        title: {
            label: ITEM_TITLE_LABEL,
            required: ITEM_TITLE_REQUIRED_MESSAGE,
            tooShort: ITEM_TITLE_TOO_SHORT_MESSAGE,
            tooLong: ITEM_TITLE_TOO_LONG_MESSAGE,
            illegalSymbols: ITEM_TITLE_ILLEGAL_SYMBOLS_MESSAGE,
            hint: ITEM_TITLE_HINT
        },
        price: {
            label: ITEM_PRICE_LABEL,
            required: ITEM_PRICE_REQUIRED_MESSAGE,
            negative: ITEM_PRICE_NEGATIVE_MESSAGE,
            tooHigh: ITEM_PRICE_TOO_HIGH_MESSAGE,
            hint: ITEM_PRICE_HINT
        },
        usedStatus: {
            label: ITEM_USED_STATUS_LABEL,
            used: ITEM_USED_LABEL,
            new: ITEM_NEW_LABEL,
            notApplicable: ITEM_NOT_APPLICABLE_LABEL,
            required: ITEM_USED_STATUS_NOT_PROVIDED_MESSAGE,
            hint: ITEM_USED_STATUS_HINT
        },
        category: {
            label: ITEM_CATEGORY_LABEL,
            required: ITEM_CATEGORY_REQUIRED_MESSAGE,
            hint: ITEM_CATEGORY_HINT
        },
        description: {
            label: ITEM_DESCRIPTION_LABEL,
            required: ITEM_DESCRIPTION_REQUIRED_MESSAGE,
            tooShort: ITEM_DESCRIPTION_TOO_SHORT_MESSAGE,
            tooLong: ITEM_DESCRIPTION_TOO_LONG_MESSAGE,
            hint: ITEM_DESCRIPTION_HINT
        },
        photos: {
            prompt: ITEM_PHOTOS_ADD_PROMPT
        },
        buttonAddItem: BUTTON_ADD_ITEM_TEXT,
        buttonUpdateItem: BUTTON_UPDATE_ITEM_TEXT
    };
    public readonly usedStatusValues = {
        used: statusToDtoString(UsedStatus.USED),
        new: statusToDtoString(UsedStatus.NEW),
        notApplicable: statusToDtoString(UsedStatus.NOT_APPLICABLE)
    };

    public readonly errorStateMatcher = new MyErrorStateMatcher();
    public categories: ItemCategory[] = [];
    protected readonly snackBarService: SnackBarService;
    protected readonly itemsService: ItemsService;
    protected readonly router: Router;
    // language=JSRegexp
    protected readonly itemTitleSymbolsPattern = '^[^!@#$^*={}|\\\\<>?]+$';

    // tslint:disable-next-line:variable-name
    public readonly controls = Object.freeze({
        title: new FormControl('', [
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
        description: new FormControl('', [
            Validators.required,
            Validators.minLength(ITEM_DESCRIPTION_MINIMUM_LENGTH),
            Validators.maxLength(ITEM_DESCRIPTION_MAXIMUM_LENGTH)
        ]),
        photoUrls: new FormControl([], Validators.maxLength(ITEM_PHOTOS_MAXIMUM_NUMBER))
    });

    public readonly form: FormGroup = new FormGroup(this.controls);

    protected constructor(
        snackBarService: SnackBarService,
        itemsService: ItemsService,
        router: Router) {
        this.snackBarService = snackBarService;
        this.itemsService = itemsService;
        this.router = router;
    }

    public get errors() {
        return {
            title: {
                notProvided: this.controls.title.hasError('required'),
                tooShort: () => this.controls.title.hasError('minlength'),
                tooLong: () => this.controls.title.hasError('maxlength'),
                doesntMatchPattern: () => {
                    return !this.errors.title.tooShort() && !this.errors.title.tooLong()
                        && this.controls.title.hasError('pattern');
                }
            },
            price: {
                notProvided: this.controls.price.hasError('required'),
                negative: this.controls.price.hasError('min'),
                tooHigh: this.controls.price.hasError('max')
            },
            status: {
                notProvided: this.controls.usedStatus.hasError('required')
            },
            category: {
                notProvided: this.controls.category.hasError('required')
            },
            description: {
                notProvided: this.controls.description.hasError('required'),
                tooShort: this.controls.description.hasError('minlength'),
                tooLong: this.controls.description.hasError('maxlength')
            },
            formIsInvalid: !this.form.valid
        };
    }

    public updatePhotoUrls(event: string[]) {
        this.controls.photoUrls.setValue(event);
    }

    protected openErrorSnackBar(errorResponse: HttpErrorResponse) {
        if (errorResponse.status === 400) {
            this.snackBarService.openSnackBar(BAD_REQUEST_DATA_MESSAGE);
        } else {
            this.snackBarService.openSnackBar(SERVER_ERROR_MESSAGE);
        }
    }
}
