import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * Service for displaying snack bars - short textual messages, visible for a short time.
 */
@Injectable({
    providedIn: "root"
})
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    /**
     * Opens a plain snackbar with only a given message.
     * @param message text to be displayed
     * @param duration number of milliseconds for which the snack bar should be visible.
     */
    openSnackBar(message: string, duration: number = 2000) {
        this.snackBar.open(message, undefined, {
            duration
        });
    }
}
