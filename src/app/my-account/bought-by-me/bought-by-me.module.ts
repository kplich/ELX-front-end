import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BoughtByMeComponent} from "@bought-by-me/bought-by-me/bought-by-me.component";
import {ItemBoughtComponent} from "@bought-by-me/item-bought/item-bought.component";
import {ItemBoughtDescriptionComponent} from "@bought-by-me/item-bought-description/item-bought-description.component";
import {ItemBoughtContractPlainAdvanceComponent} from "@bought-by-me/item-bought-offer/item-bought-contract-plain-advance/item-bought-contract-plain-advance.component";
import {ItemBoughtContractDoubleAdvanceComponent} from "@bought-by-me/item-bought-offer/item-bought-contract-double-advance/item-bought-contract-double-advance.component";
import {MaterialModule} from "@material/material.module";

@NgModule({
    declarations: [
        BoughtByMeComponent,
        ItemBoughtComponent,
        ItemBoughtDescriptionComponent,
        ItemBoughtContractPlainAdvanceComponent,
        ItemBoughtContractDoubleAdvanceComponent],
    exports: [
        BoughtByMeComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class BoughtByMeModule {
}
