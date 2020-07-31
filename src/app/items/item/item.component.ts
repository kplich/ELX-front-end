import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemsService} from '../items-service/items.service';
import {Item} from '../items-service/data/Item';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';

export const BUTTON_SEND_MESSAGE_TEXT = 'Send message';
export const BUTTON_SEND_OFFER_TEXT = 'Send offer';
export const BUTTON_ACCEPT_OFFER_TEXT = 'Accept offer';

export const COULD_NOT_LOAD_ITEM_MESSAGE = 'The item could not be loaded. Try again.';

@Component({
  selector: 'item-single',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  strings = {
    category: Item.CATEGORY_LABEL,
    buttons: {
      sendMessage: BUTTON_SEND_MESSAGE_TEXT,
      sendOffer: BUTTON_SEND_OFFER_TEXT,
      acceptOffer: BUTTON_ACCEPT_OFFER_TEXT
    },
    itemClosed: Item.CLOSED_ON_LABEL,
    addedBy: Item.ADDED_BY,
    addedOn: Item.ADDED_ON_LABEL
  };

  item: Item;

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    private snackBarService: SnackBarService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    this.itemsService.getItem(id).subscribe({
      next: response => {
        this.item = response.body;
      },
      error: error => {
        console.error(error);
        this.snackBarService.openSnackBar(COULD_NOT_LOAD_ITEM_MESSAGE);
      }
    });
  }

  get itemPhotoUrls(): SafeUrl[] {
    try {
      return this.item.getSafePhotoUrls(this.domSanitizer);
    } catch (_) {
      console.warn('item not loaded yet... no reason to panic');
      return undefined;
    }
  }
}
