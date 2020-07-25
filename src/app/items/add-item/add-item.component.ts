import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../shared/MyErrorStateMatcher';

export const ADD_ITEM_FORM_HEADER = 'Add an item for sale';

export const ITEM_TITLE_LABEL = 'Item title';
export const ITEM_TITLE_REQUIRED_MESSAGE = 'Item title is required!';
export const ITEM_TITLE_MINIMUM_LENGTH = 10;
export const ITEM_TITLE_MAXIMUM_LENGTH = 80;
export const ITEM_TITLE_TOO_SHORT_MESSAGE = `Item title must be longer than ${ITEM_TITLE_MINIMUM_LENGTH} characters.`;
export const ITEM_TITLE_TOO_LONG_MESSAGE = `Item title must not be longer than ${ITEM_TITLE_MAXIMUM_LENGTH} characters`;
export const ITEM_TITLE_ILLEGAL_SYMBOLS_MESSAGE = 'Item title cannot contain following symbols: ! @ # $ ^ * = { } \\ < > ?';
export const ITEM_TITLE_HINT = `Item title should briefly describe the item sold. Use at least ${ITEM_TITLE_MINIMUM_LENGTH} and at most ${ITEM_TITLE_MAXIMUM_LENGTH} characters.`;

export const ITEM_DESCRIPTION_LABEL = 'Item description';
export const ITEM_DESCRIPTION_REQUIRED_MESSAGE = 'Item description is required!';
export const ITEM_DESCRIPTION_MINIMUM_LENGTH = 25;
export const ITEM_DESCRIPTION_MAXIMUM_LENGTH = 5000;
export const ITEM_DESCRIPTION_TOO_SHORT_MESSAGE = `Item description must be longer than ${ITEM_DESCRIPTION_MINIMUM_LENGTH} characters.`;
export const ITEM_DESCRIPTION_TOO_LONG_MESSAGE = `Item description must not be longer than ${ITEM_DESCRIPTION_MAXIMUM_LENGTH} characters.`;
export const ITEM_DESCRIPTION_HINT = 'Describe in detail the item being sold. Usually, the longer the better, although bear in mind that not everyone might want to read an essay here ;).';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  // language=JSRegexp
  itemTitleSymbolsPattern = '^[^!@#$^*={}|\\\\<>?]+$';

  strings = {
    formHeader: ADD_ITEM_FORM_HEADER,
    itemTitle: {
      label: ITEM_TITLE_LABEL,
      required: ITEM_TITLE_REQUIRED_MESSAGE,
      tooShort: ITEM_TITLE_TOO_SHORT_MESSAGE,
      tooLong: ITEM_TITLE_TOO_LONG_MESSAGE,
      illegalSymbols: ITEM_TITLE_ILLEGAL_SYMBOLS_MESSAGE,
      hint: ITEM_TITLE_HINT
    },
    itemDescription: {
      label: ITEM_DESCRIPTION_LABEL,
      required: ITEM_DESCRIPTION_REQUIRED_MESSAGE,
      tooShort: ITEM_DESCRIPTION_TOO_SHORT_MESSAGE,
      tooLong: ITEM_DESCRIPTION_TOO_LONG_MESSAGE,
      hint: ITEM_DESCRIPTION_HINT
    }
  };

  newItemFormGroup: FormGroup = new FormGroup({
    itemTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(ITEM_TITLE_MINIMUM_LENGTH),
      Validators.maxLength(ITEM_TITLE_MAXIMUM_LENGTH),
      Validators.pattern(this.itemTitleSymbolsPattern)
    ]),
    itemDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(ITEM_DESCRIPTION_MINIMUM_LENGTH),
      Validators.maxLength(ITEM_DESCRIPTION_MAXIMUM_LENGTH)
    ])
  });

  errorStateMatcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

  // item title

  get itemTitleInput(): FormControl {
    return this.newItemFormGroup.get('itemTitle') as FormControl;
  }

  get itemTitleNotProvided(): boolean {
    return this.itemTitleInput.hasError('required');
  }

  get itemTitleTooShort(): boolean {
    return this.itemTitleInput.hasError('minlength');
  }

  get itemTitleTooLong(): boolean {
    return this.itemTitleInput.hasError('maxlength');
  }

  get itemTitleDoesntMatchPattern(): boolean {
    return !this.itemTitleTooShort && !this.itemTitleTooLong
      && this.itemTitleInput.hasError('pattern');
  }

  // item description

  get itemDescriptionInput(): FormControl {
    return this.newItemFormGroup.get('itemDescription') as FormControl;
  }

  get itemDescriptionNotProvided(): boolean {
    return this.itemDescriptionInput.hasError('required');
  }

  get itemDescriptionTooShort(): boolean {
    return this.itemDescriptionInput.hasError('minlength');
  }

  get itemDescriptionTooLong(): boolean {
    return this.itemDescriptionInput.hasError('maxlength');
  }

}
