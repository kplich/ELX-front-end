import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DialogService {

    constructor(private dialog: MatDialog) {
    }

    openDialog(component: ComponentType<unknown>, data: any): void {
        this.dialog.open(component, {data});
    }

    openDialogForData<T>(component: ComponentType<unknown>, data: any): Observable<T> {
        const dialogRef = this.dialog.open(component, {data});

        return dialogRef.afterClosed();
    }
}
