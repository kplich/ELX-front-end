import {Component, Input, OnInit} from '@angular/core';
import {Item} from '@items/data/Item';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
    selector: 'item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

    strings = {
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL
    };

    @Input() item!: Item;

    constructor(
        private domSanitizer: DomSanitizer,
        private router: Router) {
    }

    get itemPhotoUrl(): SafeUrl {
        if (this.item?.doesNotHavePhotos) {
            return this.domSanitizer.bypassSecurityTrustUrl('assets/no-photo.png');
        } else {
            return this.item?.getSafePhotoUrls(this.domSanitizer)[0];
        }
    }

    navigateToItem() {
        this.router.navigateByUrl(`/items/${this.item?.id}`).then(() => {
        });
    }
}
