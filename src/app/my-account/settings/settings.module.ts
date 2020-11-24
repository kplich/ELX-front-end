import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SettingsComponent} from "@settings/settings/settings.component";
import {ChangePasswordComponent} from "@settings/change-password/change-password.component";
import {EthereumAddressComponent} from "@settings/ethereum-address/ethereum-address.component";
import {EnableEthereumComponent} from "@settings/enable-ethereum/enable-ethereum.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@material/material.module";

/**
 * Module specifically for managing user settings, such as password or Ethereum address.
 */
@NgModule({
    declarations: [
        SettingsComponent,
        ChangePasswordComponent,
        EthereumAddressComponent,
        EnableEthereumComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        SettingsComponent
    ]
})
export class SettingsModule {
}
