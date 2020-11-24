import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatDialogModule} from "@angular/material/dialog";

/**
 * Module for Angular Material imports.
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DragDropModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,
        MatDividerModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatRadioModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule
    ],
    exports: [
        DragDropModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,
        MatDividerModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatRadioModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule
    ]
})
export class MaterialModule {
}
