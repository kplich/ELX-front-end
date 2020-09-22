import {Component, Input} from "@angular/core";
import {SimpleUser} from "@my-account/data/SimpleUser";

@Component({
    selector: "app-ethereum-address",
    templateUrl: "./ethereum-address.component.html",
    styleUrls: ["./ethereum-address.component.scss"]
})
export class EthereumAddressComponent {

    @Input() loggedInUser!: SimpleUser;

    constructor() {
    }
}
