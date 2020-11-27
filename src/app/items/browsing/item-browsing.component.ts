import {Component, OnInit} from "@angular/core";
import {Item, CategoryResponse} from "@items/data/Item";
import {ItemsService} from "@items/service/items.service";
import {ItemFilteringCriteria} from "@items/browsing-criteria/ItemFilteringCriteria";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: "item-browsing",
    templateUrl: "./item-browsing.component.html",
    styleUrls: ["./item-browsing.component.scss"]
})
export class ItemBrowsingComponent implements OnInit {

    displayedItems$!: Observable<Item[]>;
    categories$: Observable<CategoryResponse[]> | undefined;
    private items$: Observable<Item[]> | undefined;

    constructor(private itemService: ItemsService) {
    }

    ngOnInit() {
        this.categories$ = this.itemService.getCategories();
        this.items$ = this.itemService.getAllItems();
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
