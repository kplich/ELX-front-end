import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../shared/MyErrorStateMatcher';

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
export const ITEM_USED_LABEL = 'Used';
export const ITEM_USED_VALUE = 'USED';
export const ITEM_NEW_LABEL = 'New';
export const ITEM_NEW_VALUE = 'NEW';
export const ITEM_NOT_APPLICABLE_LABEL = 'Not applicable';
export const ITEM_NOT_APPLICABLE_VALUE = 'NOT_APPLICABLE';
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


export const BUTTON_ADD_ITEM_TEXT = 'Add item';

@Component({
  selector: 'item-add',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  // language=JSRegexp
  itemTitleSymbolsPattern = '^[^!@#$^*={}|\\\\<>?]+$';

  strings = {
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

  usedStatusValues = {
    used: ITEM_USED_VALUE,
    new: ITEM_NEW_VALUE,
    notApplicable: ITEM_NOT_APPLICABLE_VALUE
  };

  categories = ['Books', 'Clothes', 'Computer hardware'];

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

  constructor() { }

  ngOnInit(): void {
  }

  sendRequestToAddItem() {

  }

  updatePhotoUrls(event: string[]) {
    this.photoUrlsInput.setValue(event);
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
