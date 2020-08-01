import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../items-service/data/Item';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

    strings = {
        category: Item.CATEGORY_LABEL,
        itemClosed: Item.CLOSED_ON_LABEL,
        addedBy: Item.ADDED_BY,
        addedOn: Item.ADDED_ON_LABEL
    };

    @Input() item: Item;

    constructor(private domSanitizer: DomSanitizer) {
    }

    get itemPhotoUrl(): SafeUrl {
        if (this.item?.doesNotHavePhotos) {
            return this.domSanitizer.bypassSecurityTrustUrl('assets/no-photo.png');
        } else {
            return this.item.getSafePhotoUrls(this.domSanitizer)[0];
        }
    }

    ngOnInit(): void {
    }
}
