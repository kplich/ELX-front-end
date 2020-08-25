import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../items-service/items.service';
import {NewOrUpdatedItemRequest} from '../items-service/data/Item';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {Router} from '@angular/router';
import {
    COULD_NOT_LOAD_CATEGORIES_MESSAGE,
    ItemEditBaseComponent
} from '../edit-item-base/ItemEditBase';

export const ITEM_ADDED_SUCCESSFULLY_MESSAGE = 'Item added successfully!';

@Component({
    selector: 'item-add',
    templateUrl: './add-item.component.html',
    styleUrls: ['../edit-item-base/edit-item-base.component.scss']
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
            next: response => {
                if (response.body === null) throw new Error('Empty response body');
                this.router.navigateByUrl(`/items/${response.body.id}`).then(() => {
                    this.snackBarService.openSnackBar(ITEM_ADDED_SUCCESSFULLY_MESSAGE);
                });
            },
            error: error => this.openErrorSnackBar(error)
        });
    }

    ngOnInit() {
        this.itemsService.getCategories().subscribe({
            next: response => {
                if(response.body === null) {
                    this.categories = [];
                }
                else {
                    this.categories = response.body;
                }
            },
            error: () => this.snackBarService.openSnackBar(COULD_NOT_LOAD_CATEGORIES_MESSAGE)
        });
    }
}
