import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MyAccountComponent} from "@my-account/my-account/my-account.component";
import {MaterialModule} from "@material/material.module";
import {SoldByMeModule} from "@my-account/sold-by-me/sold-by-me.module";
import {SettingsModule} from "@my-account/settings/settings.module";
import {WantedByMeModule} from "@wanted-by-me/wanted-by-me.module";
import {BoughtByMeModule} from "@my-account/bought-by-me/bought-by-me.module";

@NgModule({
    declarations: [
        MyAccountComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SoldByMeModule,
        WantedByMeModule,
        BoughtByMeModule,
        SettingsModule
    ],
    exports: [
        MyAccountComponent,
    ]
})
export class MyAccountModule {
}
