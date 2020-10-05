import {Component, OnInit} from "@angular/core";
import {Item, CategoryResponse} from "@items/data/Item";
import {ItemsService} from "@items/service/items.service";
import {ItemFilteringCriteria} from "@items/browsing-criteria/ItemFilteringCriteria";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";

export const COULD_NOT_LOAD_ITEMS_MESSAGE = "Could not load items :/.";
export const NO_ITEMS_FOUND_MESSAGE = "No items matching given criteria were found.";

@Component({
    selector: "item-browsing",
    templateUrl: "./item-browsing.component.html",
    styleUrls: ["./item-browsing.component.scss"]
})
export class ItemBrowsingComponent implements OnInit {

    strings = {
        couldNotLoadItemsMessage: COULD_NOT_LOAD_ITEMS_MESSAGE,
        noItemsFoundMessage: NO_ITEMS_FOUND_MESSAGE
    };

    displayedItems!: Item[];
    categories!: CategoryResponse[];
    private allItems!: Item[];

    constructor(private itemService: ItemsService,
                private snackBarService: SnackBarService) {
    }

    get itemsWereLoaded(): boolean {
        return this.allItems === undefined || this.allItems?.length !== 0;
    }

    get itemsWereFound(): boolean {
        return this.displayedItems?.length !== 0;
    }

    ngOnInit() {
        this.itemService.getCategories().subscribe({
            next: categoriesResponse => {
                if (categoriesResponse.body === null) { throw new Error("Empty categories response body"); }
                this.categories = categoriesResponse.body;

                this.itemService.getAllItems().subscribe({
                    next: itemsResponse => {
                        if (itemsResponse.body === null) { throw new Error("Empty items Response body"); }
                        this.allItems = itemsResponse.body;
                        this.displayedItems = this.allItems;
                    }
                });
            },
            error: () => {
                this.snackBarService.openSnackBar(this.strings.couldNotLoadItemsMessage);
            }
        });
    }

    filterItems(filteringCriteria: ItemFilteringCriteria) {
        // TODO: don't filter when criteria haven't changed (simple === comparison doesn't suffice!)
        this.displayedItems = this.allItems.filter(item => filteringCriteria.acceptItem(item));
    }
}
