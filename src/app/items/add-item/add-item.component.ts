import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../shared/MyErrorStateMatcher';
import {statusToDtoString, UsedStatus} from '../items-service/data/UsedStatus';
import {ItemsService} from '../items-service/items.service';
import {ItemCategory, NewOrUpdatedItemRequest} from '../items-service/data/Item';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {HttpErrorResponse} from '@angular/common/http';
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
export const ITEM_USED_VALUE = statusToDtoString(UsedStatus.USED);
export const ITEM_NEW_LABEL = UsedStatus.NEW;
export const ITEM_NEW_VALUE = statusToDtoString(UsedStatus.NEW);
export const ITEM_NOT_APPLICABLE_LABEL = UsedStatus.NOT_APPLICABLE;
export const ITEM_NOT_APPLICABLE_VALUE = statusToDtoString(UsedStatus.NOT_APPLICABLE);
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
export const ITEM_ADDED_SUCCESSFULLY_MESSAGE = 'Item added successfully!';

export const BUTTON_ADD_ITEM_TEXT = 'Add item';

@Component({
  selector: 'item-add',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  // language=JSRegexp
    readonly itemTitleSymbolsPattern = '^[^!@#$^*={}|\\\\<>?]+$';

    readonly strings = {
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
    buttonAddItem: BUTTON_ADD_ITEM_TEXT
  };

    readonly usedStatusValues = {
        used: ITEM_USED_VALUE,
        new: ITEM_NEW_VALUE,
        notApplicable: ITEM_NOT_APPLICABLE_VALUE
    };

  categories: ItemCategory[] = [];

  newItemFormGroup: FormGroup = new FormGroup({
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

  errorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.itemsService.getCategories().subscribe({
      next: response => {
        this.categories = response.body;
      },
      error: () => this.snackBarService.openSnackBar(COULD_NOT_LOAD_CATEGORIES_MESSAGE)
    });
  }

  sendRequestToAddItem() {
    this.itemsService.addNewItem(this.newItemRequest).subscribe({
      next: response => {
        this.router.navigateByUrl(`/item/${response.body.id}`).then(() => {
          this.snackBarService.openSnackBar(ITEM_ADDED_SUCCESSFULLY_MESSAGE);
        });
      },
      error: error => this.openErrorSnackBar(error)
    });
  }

  updatePhotoUrls(event: string[]) {
    this.photoUrlsInput.setValue(event);
  }

  private openErrorSnackBar(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 400) {
      this.snackBarService.openSnackBar(BAD_REQUEST_DATA_MESSAGE);
    } else {
      this.snackBarService.openSnackBar(SERVER_ERROR_MESSAGE);
    }
  }

  get newItemRequest(): NewOrUpdatedItemRequest {
    return {
      title: this.titleInput.value,
      description: this.descriptionInput.value,
      price: this.priceInput.value,
      category: this.categoryInput.value,
      usedStatus: this.usedStatusInput.value,
      photos: this.photoUrlsInput.value
    };
  }

  get formIsValid(): boolean {
    return this.newItemFormGroup.valid;
  }

  // title

  get titleInput(): FormControl {
    return this.newItemFormGroup.get('title') as FormControl;
  }

  get titleNotProvided(): boolean {
    return this.titleInput.hasError('required');
  }

  get titleTooShort(): boolean {
    return this.titleInput.hasError('minlength');
  }

  get titleTooLong(): boolean {
    return this.titleInput.hasError('maxlength');
  }

  get titleDoesntMatchPattern(): boolean {
    return !this.titleTooShort && !this.titleTooLong
      && this.titleInput.hasError('pattern');
  }

  // price

  get priceInput(): FormControl {
    return this.newItemFormGroup.get('price') as FormControl;
  }

  get priceNotProvided(): boolean {
    return this.priceInput.hasError('required');
  }

  get priceIsNegative(): boolean {
    return this.priceInput.hasError('min');
  }

  get priceIsTooHigh(): boolean {
    return this.priceInput.hasError('max');
  }

  // used status

  get usedStatusInput(): FormControl {
    return this.newItemFormGroup.get('usedStatus') as FormControl;
  }

  get usedStatusNotProvided(): boolean {
    return this.usedStatusInput.hasError('required');
  }

  // category

  get categoryInput(): FormControl {
    return this.newItemFormGroup.get('category') as FormControl;
  }

  get categoryNotProvided(): boolean {
    return this.categoryInput.hasError('required');
  }

  // description

  get descriptionInput(): FormControl {
    return this.newItemFormGroup.get('description') as FormControl;
  }

  get descriptionNotProvided(): boolean {
    return this.descriptionInput.hasError('required');
  }

  get descriptionTooShort(): boolean {
    return this.descriptionInput.hasError('minlength');
  }

  get descriptionTooLong(): boolean {
    return this.descriptionInput.hasError('maxlength');
  }

  // photo list

  get photoUrlsInput(): FormControl {
    return this.newItemFormGroup.get('photoUrls') as FormControl;
  }


}
