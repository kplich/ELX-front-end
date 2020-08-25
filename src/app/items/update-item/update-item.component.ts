import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ItemsService} from '../items-service/items.service';
import {Item, NewOrUpdatedItemRequest} from '../items-service/data/Item';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoUploaderComponent} from '../../shared/photo-uploader/photo-uploader.component';
import {
    COULD_NOT_LOAD_CATEGORIES_MESSAGE,
    ItemEditBaseComponent
} from '../edit-item-base/ItemEditBase';
import {AuthenticationService} from '../../identity-management/authentication-service/authentication.service';
import {MatFormField} from '@angular/material/form-field';
import {statusToDtoString} from '../items-service/data/UsedStatus';

export const ITEM_UPDATED_SUCCESSFULLY_MESSAGE = 'Item updated successfully!';
export const COULD_NOT_LOAD_ITEM = 'Could not load item.';

@Component({
    selector: 'item-update',
    templateUrl: './update-item.component.html',
    styleUrls: ['../edit-item-base/edit-item-base.component.scss']
})
export class UpdateItemComponent extends ItemEditBaseComponent implements OnInit {

    @ViewChild(PhotoUploaderComponent) private photoUploader!: PhotoUploaderComponent;
    @ViewChildren(MatFormField) private formFields!: MatFormField[];
    private id!: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authenticationService: AuthenticationService,
        itemsService: ItemsService,
        router: Router,
        snackBarService: SnackBarService
    ) {
        super(snackBarService, itemsService, router);
    }

    private get newItemRequest(): NewOrUpdatedItemRequest {
        return {
            id: this.id,
            title: this.controls.title.value,
            description: this.controls.description.value,
            price: this.controls.price.value,
            category: this.controls.category.value,
            usedStatus: this.controls.usedStatus.value,
            photos: this.controls.photoUrls.value
        };
    }

    async ngOnInit() {
        try {
            const categories = (await this.itemsService.getCategories().toPromise()).body;
            if(categories === null) {
                this.categories = [];
            }
            else {
                this.categories = categories;
            }
        } catch (err) {
            this.snackBarService.openSnackBar(COULD_NOT_LOAD_CATEGORIES_MESSAGE);
            return;
        }

        this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!, 10);
        try {
            const item = (await this.itemsService.getItem(this.id).toPromise()).body;
            if(item === null) {
                console.warn('empty response body');
                this.snackBarService.openSnackBar(COULD_NOT_LOAD_ITEM);
                return;
            }

            console.log(item);
            if (item.isClosed
                || item.addedBy.username !== this.authenticationService.authenticatedUser) {
                this.router.navigateByUrl('/items').then(() => {
                    // HACK: router doesn't seem to be navigating as expected;
                    window.location.reload();
                });
            } else {
                this.initializeFormWithItem(item);
            }
        } catch (err) {

        }
    }

    sendRequestToUpdateItem() {
        this.itemsService.updateItem(this.newItemRequest).subscribe({
            next: response => {
                if (response.body === null) throw new Error('Response with empty body!');
                this.router.navigateByUrl(`/items/${response.body.id}`).then(() => {
                    this.snackBarService.openSnackBar(ITEM_UPDATED_SUCCESSFULLY_MESSAGE);
                });
            },
            error: error => this.openErrorSnackBar(error)
        });
    }

    private initializeFormWithItem(item: Item) {
        this.controls.title.setValue(item.title);
        this.controls.price.setValue(item.price);
        this.controls.usedStatus.setValue(statusToDtoString(item.usedStatus));
        this.controls.category.setValue(item.category.id);
        this.controls.description.setValue(item.description);
        this.controls.photoUrls.setValue(item.photoUrls);

        this.photoUploader.initPhotoUploader(this.controls.photoUrls.value);

        // HACK: ugly form right after updating controls
        setTimeout(() => document.getElementById('title-native-input')!.focus(), 100);
        setTimeout(() => document.getElementById('title-native-input')!.blur(), 100);
    }
}
