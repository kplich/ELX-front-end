import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ItemBrowsingComponent} from "@items/browsing/item-browsing.component";
import {MaterialModule} from "@material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemComponent} from "@items/item/item.component";
import {MatCarouselModule} from "@ngmodule/material-carousel";
import {AddItemComponent} from "@items/add/add-item.component";
import {SharedModule} from "@shared/shared.module";
import {ItemCardComponent} from "@items/item-card/item-card.component";
import {ItemBrowsingCriteriaComponent} from "@items/browsing-criteria/item-browsing-criteria.component";
import {RouterModule} from "@angular/router";
import {UpdateItemComponent} from "./update-item/update-item.component";

/**
 * Module for browsing and editing items.
 */
@NgModule({
    declarations: [
        ItemComponent,
        ItemBrowsingComponent,
        ItemBrowsingCriteriaComponent,
        AddItemComponent,
        ItemCardComponent,
        UpdateItemComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        MatCarouselModule.forRoot(),
        SharedModule,
        RouterModule,
    ]
})
export class ItemsModule {
}
