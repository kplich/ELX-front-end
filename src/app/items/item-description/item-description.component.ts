import {Component, Input} from "@angular/core";
import {Item} from "@items/data/Item";

export const STRINGS = {
    addedBy: Item.ADDED_BY,
    addedOn: Item.ADDED_ON_LABEL,
};

@Component({
    selector: "item-description",
    templateUrl: "./item-description.component.html",
    styleUrls: ["./item-description.component.scss"]
})
export class ItemDescriptionComponent {
    strings = STRINGS;

    @Input() item!: Item;

    constructor() {}
}
