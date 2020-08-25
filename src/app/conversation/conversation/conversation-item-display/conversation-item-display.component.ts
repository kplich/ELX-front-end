import {Component, Input} from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import {Item} from "../../../items/items-service/data/Item";

@Component({
    selector: 'app-conversation-item-display',
    templateUrl: './conversation-item-display.component.html',
    styleUrls: ['./conversation-item-display.component.scss']
})
export class ConversationItemDisplayComponent {

    @Input() item: Item | undefined;

    constructor(private domSanitizer: DomSanitizer) {}

    get photoUrl(): SafeUrl | undefined {
        return this?.item?.getSafePhotoUrls(this.domSanitizer)[0];
    }
}
