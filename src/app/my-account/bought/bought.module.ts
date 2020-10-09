import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BoughtComponent} from "@bought/bought/bought.component";
import {ItemBoughtComponent} from "@bought/item-bought/item-bought.component";
import {ItemBoughtDescriptionComponent} from "@bought/item-bought-description/item-bought-description.component";
import {ItemBoughtContractPlainAdvanceComponent} from "@bought/item-bought-offer/item-bought-contract-plain-advance/item-bought-contract-plain-advance.component";
import {ItemBoughtContractDoubleAdvanceComponent} from "@bought/item-bought-offer/item-bought-contract-double-advance/item-bought-contract-double-advance.component";
import {MaterialModule} from "@material/material.module";
import {ItemBoughtContractDetailsComponent} from "@bought/item-bought-offer/item-bought-contract-details/item-bought-contract-details.component";

@NgModule({
    declarations: [
        BoughtComponent,
        ItemBoughtComponent,
        ItemBoughtDescriptionComponent,
        ItemBoughtContractPlainAdvanceComponent,
        ItemBoughtContractDoubleAdvanceComponent,
        ItemBoughtContractDetailsComponent,
    ],
    exports: [
        BoughtComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class BoughtModule {
}
