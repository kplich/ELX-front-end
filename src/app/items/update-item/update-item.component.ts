import {Component, OnInit, ViewChild, ViewChildren, OnDestroy} from "@angular/core";
import {ItemsService} from "@items/service/items.service";
import {Item, NewOrUpdatedItemRequest} from "@items/data/Item";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoUploaderComponent} from "@shared/photo-uploader/photo-uploader.component";
import {ItemEditBaseComponent, STRINGS as STRINGS_BASE} from "@items/edit-base/ItemEditBase";
import {MatFormField} from "@angular/material/form-field";
import {statusToDtoString} from "@items/data/UsedStatus";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription, of} from "rxjs";
import {catchError} from "rxjs/operators";

export const STRINGS = {
    messages: {
        itemUpdatedSuccessfully: "Item updated successfully!",
        couldNotLoadItem: "Could not load item.",
        noItemIdProvided: "Not item ID provided!"
    }
};

@Component({
    selector: "item-update",
    templateUrl: "./update-item.component.html",
    styleUrls: ["../edit-base/edit-item-base.component.scss"]
})
export class UpdateItemComponent extends ItemEditBaseComponent implements OnInit, OnDestroy {

    itemSubscription!: Subscription;
    @ViewChild(PhotoUploaderComponent) private photoUploader!: PhotoUploaderComponent;
    @ViewChildren(MatFormField) private formFields!: MatFormField[];
    private id!: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private loggedInUserService: LoggedInUserService,
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
        this.categories$ = this.itemsService.getCategories().pipe(
            catchError(_ => {
                this.router.navigateByUrl("/error").then(() => {
                    this.snackBarService.openSnackBar(STRINGS_BASE.messages.couldNotLoadCategories);
                });
                return of([]);
            })
        );

        const itemIdString = this.activatedRoute.snapshot.paramMap.get("id");
        if (itemIdString === null) {
            this.router.navigateByUrl("/error").then(() => {
                this.snackBarService.openSnackBar(STRINGS.messages.noItemIdProvided);
            });
            return;
        }

        this.id = parseInt(itemIdString, 10);
        if (isNaN(this.id)) {
            this.router.navigateByUrl("/error").then(() => {
                this.snackBarService.openSnackBar(STRINGS.messages.noItemIdProvided);
            });
            return;
        }

        this.itemSubscription = this.itemsService.getItem(this.id).subscribe(item => {
            this.initializeFormWithItem(item);
        });
    }

    sendRequestToUpdateItem() {
        this.itemsService.updateItem(this.newItemRequest).subscribe({
            next: (item: Item) => {
                this.router.navigateByUrl(`/items/${item.id}`).then(() => {
                    this.snackBarService.openSnackBar(STRINGS.messages.itemUpdatedSuccessfully);
                });
            },
            error: (error: HttpErrorResponse) => this.openErrorSnackBar(error)
        });
    }

    ngOnDestroy() {
        this.itemSubscription.unsubscribe();
    }

    private initializeFormWithItem(item: Item) {
        this.controls.title.setValue(item.title);
        this.controls.price.setValue(item.price);
        this.controls.usedStatus.setValue(statusToDtoString(item.usedStatus));
        this.controls.category.setValue(item.category.id);
        this.controls.description.setValue(item.description);
        this.controls.photoUrls.setValue(item.photoUrls);

        this.photoUploader.initPhotoUploader(this.controls.photoUrls.value);
    }
}
