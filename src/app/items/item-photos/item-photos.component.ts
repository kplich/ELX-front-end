import {Component, Input} from "@angular/core";
import {Item} from "@items/data/Item";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
    selector: "item-photos",
    templateUrl: "./item-photos.component.html",
    styleUrls: ["./item-photos.component.scss"]
})
export class ItemPhotosComponent {

    @Input() item!: Item;

    constructor(private domSanitizer: DomSanitizer) {
    }

    get itemPhotoUrls(): SafeUrl[] | undefined {
        return this.item?.getSafePhotoUrls(this.domSanitizer);
    }
}
