import {Component, Inject, Input} from "@angular/core";
import {SimpleUser} from "@my-account/data/SimpleUser";
import {WEB3} from "@shared/web3-token";
import Web3 from "web3";

@Component({
    selector: "app-ethereum-address",
    templateUrl: "./ethereum-address.component.html",
    styleUrls: ["./ethereum-address.component.scss"]
})
export class EthereumAddressComponent {

    @Input() loggedInUser!: SimpleUser;

    constructor(@Inject(WEB3) private web3: Web3) {
        this.web3.eth.getAccounts().then(console.log);
    }

    private get accounts(): Promise<string[]> {
        return this.web3.eth.getAccounts();
    }

    async userIsLoggedInWithDeclaredAccount(): Promise<boolean> {
        return this.loggedInUser.ethereumAddress !== null && (await this.accounts)[0] === this.loggedInUser.ethereumAddress;
    }
}
