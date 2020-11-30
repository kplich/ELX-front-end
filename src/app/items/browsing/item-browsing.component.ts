import {Component, OnInit} from "@angular/core";
import {Item, CategoryResponse} from "@items/data/Item";
import {ItemsService} from "@items/service/items.service";
import {ItemFilteringCriteria} from "@items/browsing-criteria/ItemFilteringCriteria";
import {Observable, of} from "rxjs";
import {map, catchError} from "rxjs/operators";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {HttpErrorResponse} from "@angular/common/http";

export const STRINGS = {
    messages: {
        couldNotLoadItems: "Could not load items.",
        couldNotLoadCategories: "Could not load categories."
    }
};

@Component({
    selector: "item-browsing",
    templateUrl: "./item-browsing.component.html",
    styleUrls: ["./item-browsing.component.scss"]
})
export class ItemBrowsingComponent implements OnInit {

    displayedItems$!: Observable<Item[]>;
    categories$: Observable<CategoryResponse[]> | undefined;
    private items$!: Observable<Item[]>;

    constructor(private itemService: ItemsService, private snackBarService: SnackBarService) {
    }

    ngOnInit() {
        try {
            this.categories$ = this.itemService.getCategories().pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error(error.status, error.message);
                    this.snackBarService.openSnackBar(STRINGS.messages.couldNotLoadCategories);
                    return of([]);
                })
            );
            this.items$ = this.itemService.getAllItems().pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error(error.status, error.message);
                    this.snackBarService.openSnackBar(STRINGS.messages.couldNotLoadItems);
                    return of([]);
                })
            );
        } catch (error) {

        }

        this.displayedItems$ = this.items$;
    }

    filterItems(filteringCriteria: ItemFilteringCriteria) {
        // TODO: don't filter when criteria haven't changed (simple === comparison doesn't suffice!)
        if (this.items$) {
            this.displayedItems$ = this.items$.pipe(
                map(items => items.filter(item => filteringCriteria.acceptItem(item)))
            );
        }
    }
}
