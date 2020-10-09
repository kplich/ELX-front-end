import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MyAccountComponent} from "@my-account/my-account/my-account.component";
import {MaterialModule} from "@material/material.module";
import {WantedToSellModule} from "@wanted-to-sell/wanted-to-sell.module";
import {SettingsModule} from "@my-account/settings/settings.module";
import {WantedToBuyModule} from "@wanted-to-buy/wanted-to-buy.module";
import {BoughtModule} from "@bought/bought.module";
import {SoldModule} from "@my-account/sold/sold.module";

@NgModule({
    declarations: [
        MyAccountComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        WantedToSellModule,
        WantedToBuyModule,
        BoughtModule,
        SettingsModule,
        SoldModule
    ],
    exports: [
        MyAccountComponent,
    ]
})
export class MyAccountModule {
}
