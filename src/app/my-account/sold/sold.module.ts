import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SoldComponent} from "@sold/sold/sold.component";
import {ItemSoldComponent} from "@sold/item-sold/item-sold.component";
import {ItemSoldDescriptionComponent} from "@sold/item-sold-description/item-sold-description.component";
import {ItemSoldContractPlainAdvanceComponent} from "@sold/item-sold-contract/item-sold-contract-plain-advance/item-sold-contract-plain-advance.component";
import {ItemSoldContractDetailsComponent} from "@sold/item-sold-contract/item-sold-contract-details/item-sold-contract-details.component";
import {ItemSoldContractDoubleAdvanceComponent} from "@sold/item-sold-contract/item-sold-contract-double-advance/item-sold-contract-double-advance.component";
import {MaterialModule} from "@material/material.module";

@NgModule({
    declarations: [
        SoldComponent,
        ItemSoldComponent,
        ItemSoldDescriptionComponent,
        ItemSoldContractPlainAdvanceComponent,
        ItemSoldContractDetailsComponent,
        ItemSoldContractDoubleAdvanceComponent
    ],
    exports: [
        SoldComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class SoldModule {
}
