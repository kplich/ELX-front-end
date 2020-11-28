import {Component, OnInit} from "@angular/core";
import {ItemsService} from "@items/service/items.service";
import {NewOrUpdatedItemRequest, Item} from "@items/data/Item";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {Router} from "@angular/router";
import {ItemEditBaseComponent, STRINGS as STRINGS_BASE} from "@items/edit-base/ItemEditBase";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

export const STRINGS = {
    messages: {
        itemAddedSuccessfully: "Item added successfully!"
    }
};

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
                    this.snackBarService.openSnackBar(STRINGS.messages.itemAddedSuccessfully);
                });
            },
            error: (error: HttpErrorResponse) => this.openErrorSnackBar(error)
        }).unsubscribe();
    }

    ngOnInit() {
        this.categories$ = this.itemsService.getCategories().pipe(
            catchError(_ => {
                this.router.navigateByUrl("/error").then(() => {
                    this.snackBarService.openSnackBar(STRINGS_BASE.messages.couldNotLoadCategories);
                });

                return of([]);
            })
        );
    }
}
