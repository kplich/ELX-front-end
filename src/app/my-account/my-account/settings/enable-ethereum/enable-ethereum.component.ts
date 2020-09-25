import {Component, Inject} from "@angular/core";
import {WEB3} from "@shared/web3-token";
import Web3 from "web3";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";

@Component({
    selector: "app-enable-ethereum",
    templateUrl: "./enable-ethereum.component.html",
    styleUrls: ["./enable-ethereum.component.scss"]
})
export class EnableEthereumComponent {

    constructor(@Inject(WEB3) private web3: Web3,
                private snackBarService: SnackBarService) {
    }

    async noEthereumAddressIsLoggedIn(): Promise<boolean> {
        console.log((await this.web3.eth.getAccounts()).length);
        console.log((await this.web3.eth.getAccounts()).length === 0);
        return (await this.web3.eth.getAccounts()).length === 0;
    }

    connectToBlockchain() {
        window.ethereum.enable().catch(() => {
            this.snackBarService.openSnackBar("You did not allow the wallet to connect.");
        }).then(() => {
            this.snackBarService.openSnackBar("You're connected to blockchain!");
        });
    }
}
