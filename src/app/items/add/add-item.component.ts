import {Component, OnInit} from "@angular/core";
import {ItemsService} from "@items/service/items.service";
import {NewOrUpdatedItemRequest, Item} from "@items/data/Item";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {Router} from "@angular/router";
import {ItemEditBaseComponent} from "@items/edit-base/ItemEditBase";
import {HttpErrorResponse } from "@angular/common/http";

export const ITEM_ADDED_SUCCESSFULLY_MESSAGE = "Item added successfully!";

@Component({
    selector: "item-add",
    templateUrl: "./add-item.component.html",
    styleUrls: ["../edit-base/edit-item-base.component.scss"]
})
export class AddItemComponent extends ItemEditBaseComponent implements OnInit {
    constructor(
        itemsService: ItemsService,
        router: Router,
        snackBarService: SnackBarService
    ) {
        super(snackBarService, itemsService, router);
    }

    private get newItemRequest(): NewOrUpdatedItemRequest {
        return {
            title: this.controls.title.value,
            description: this.controls.description.value,
            price: this.controls.price.value,
            category: this.controls.category.value,
            usedStatus: this.controls.usedStatus.value,
            photos: this.controls.photoUrls.value
        };
    }

    sendRequestToAddItem() {
        this.itemsService.addNewItem(this.newItemRequest).subscribe({
            next: (item: Item) => {
                this.router.navigateByUrl(`/items/${item.id}`).then(() => {
                    this.snackBarService.openSnackBar(ITEM_ADDED_SUCCESSFULLY_MESSAGE);
                });
            },
            error: (error: HttpErrorResponse) => this.openErrorSnackBar(error)
        }).unsubscribe();
    }

    ngOnInit() {
        this.categories$ = this.itemsService.getCategories();
    }
}
