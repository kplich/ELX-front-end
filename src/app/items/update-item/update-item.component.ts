import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from '../items-service/items.service';
import {Item, NewOrUpdatedItemRequest} from '../items-service/data/Item';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoUploaderComponent} from '../../shared/photo-uploader/photo-uploader.component';
import {
    COULD_NOT_LOAD_CATEGORIES_MESSAGE,
    ItemEditBaseComponent
} from '../edit-item-base/ItemEditBase';

export const ITEM_ADDED_SUCCESSFULLY_MESSAGE = 'Item added successfully!';

@Component({
    selector: 'item-update',
    templateUrl: './update-item.component.html',
    styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent extends ItemEditBaseComponent implements OnInit, AfterViewInit {

    @ViewChild(PhotoUploaderComponent) private photoUploader;

    constructor(
        private activatedRoute: ActivatedRoute,
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

    async ngOnInit() {
        this.itemsService.getCategories().subscribe({
            next: categoryResponse => {
                this.categories = categoryResponse.body;
            },
            error: () => this.snackBarService.openSnackBar(COULD_NOT_LOAD_CATEGORIES_MESSAGE)
        });
    }

    ngAfterViewInit() {
        this.photoUploader.initPhotoUploader(this.controls.photoUrls.value);
    }

    sendRequestToAddItem() {
        this.itemsService.addNewItem(this.newItemRequest).subscribe({
            next: response => {
                this.router.navigateByUrl(`/item/${response.body.id}`).then(() => {
                    this.snackBarService.openSnackBar(ITEM_ADDED_SUCCESSFULLY_MESSAGE);
                });
            },
            error: error => this.openErrorSnackBar(error)
        });
    }

    private initializeFormWithItem(item: Item) {
        this.controls.title.setValue(item.title);
        this.controls.price.setValue(item.price);
        this.controls.usedStatus.setValue(item.usedStatus);
        this.controls.category.setValue(item.category);
        this.controls.description.setValue(item.description);
        this.controls.photoUrls.setValue(item.photoUrls);
    }
}
