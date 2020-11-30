import {Component, Input} from "@angular/core";
import {Item} from "@items/data/Item";

export const STRINGS = {
    messages: {
        couldNotLoadItems: "Could not load items.",
        noItemsFound: "No items matching given criteria were found."
    }
};

@Component({
    selector: "item-list",
    templateUrl: "./item-list.component.html",
    styleUrls: ["./item-list.component.scss"]
})
export class ItemListComponent {

    strings = STRINGS;

    @Input() items!: Item[] | undefined;

    constructor() {
    }

    get itemsWereLoaded(): boolean {
        return this.items !== undefined;
    }

    get itemsWereFound(): boolean {
        return this.itemsWereLoaded && this.items?.length !== 0;
    }

}
