import {Component, Input} from "@angular/core";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";

@Component({
    selector: "app-enable-ethereum",
    templateUrl: "./enable-ethereum.component.html",
    styleUrls: ["./enable-ethereum.component.scss"]
})
export class EnableEthereumComponent {

    @Input() accounts!: string[];

    constructor(private snackBarService: SnackBarService) {
    }

    get noEthereumAddressIsLoggedIn(): boolean {
        return this.accounts.length === 0;
    }

    connectToBlockchain() {
        window.ethereum.enable()
            .catch(() => {
            this.snackBarService.openSnackBar("You did not allow the wallet to connect.");
        })
            .then(() => {
            this.snackBarService.openSnackBar("You're connected to blockchain!");
        });
    }
}
