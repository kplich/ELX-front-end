import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BoughtByMeComponent} from "@bought-by-me/bought-by-me/bought-by-me.component";
import {ItemBoughtComponent} from "@bought-by-me/item-bought/item-bought.component";
import {ItemBoughtDescriptionComponent} from "@bought-by-me/item-bought-description/item-bought-description.component";
import {ItemBoughtOfferPlainAdvanceComponent} from "@bought-by-me/item-bought-offer/item-bought-offer-plain-advance/item-bought-offer-plain-advance.component";
import {ItemBoughtOfferDoubleAdvanceComponent} from "@bought-by-me/item-bought-offer/item-bought-offer-double-advance/item-bought-offer-double-advance.component";

@NgModule({
    declarations: [
        BoughtByMeComponent,
        ItemBoughtComponent,
        ItemBoughtDescriptionComponent,
        ItemBoughtOfferPlainAdvanceComponent,
        ItemBoughtOfferDoubleAdvanceComponent],
    exports: [
        BoughtByMeComponent
    ],
    imports: [
        CommonModule
    ]
})
export class BoughtByMeModule {
}
