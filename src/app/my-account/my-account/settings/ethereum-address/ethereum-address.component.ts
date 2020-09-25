import {Component, Input} from "@angular/core";
import {SimpleUser} from "@my-account/data/SimpleUser";

@Component({
    selector: "app-ethereum-address",
    templateUrl: "./ethereum-address.component.html",
    styleUrls: ["./ethereum-address.component.scss"]
})
export class EthereumAddressComponent {

    @Input() loggedInUser!: SimpleUser;
    @Input() accounts!: string[];

    constructor() {
    }

    userIsLoggedInWithDeclaredAccount(): boolean {
        if (this.accounts.length > 1) {
            console.warn("more than one account controlled");
        }

        return this.accounts.length > 0 && this.accounts[0] === this.loggedInUser.ethereumAddress;
    }
}
