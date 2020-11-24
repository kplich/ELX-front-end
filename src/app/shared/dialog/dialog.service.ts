import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";
import {Observable} from "rxjs";

/**
 * A service for displaying components in dialogs.
 */
@Injectable({
    providedIn: "root"
})
export class DialogService {

    constructor(private dialog: MatDialog) {
    }

    /**
     * Opens a dialog window.
     * @param componentType type of the component to be shown in the dialog
     * @param data data to be passed into the component instance
     */
    openDialog(componentType: ComponentType<unknown>, data: any): void {
        this.dialog.open(componentType, {data});
    }

    /**
     * Opens a dialog window, expecting data to be returned when it's closed.
     * @param componentType type of the component to be shown in the dialog
     * @param data data to be passed into the component instance
     * @returns an Observable with data returned by the component during closing of the dialog.
     */
    openDialogForData<T>(componentType: ComponentType<unknown>, data: any): Observable<T> {
        const dialogRef = this.dialog.open(componentType, {data});

        return dialogRef.afterClosed();
    }
}
