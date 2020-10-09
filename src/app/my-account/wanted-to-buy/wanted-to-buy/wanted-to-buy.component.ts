import {Component, Input} from "@angular/core";
import {FullUser} from "@my-account/data/FullUser";

@Component({
    selector: "wanted-by-me",
    templateUrl: "./wanted-to-buy.component.html",
    styleUrls: ["./wanted-to-buy.component.scss"]
})
export class WantedToBuyComponent {

    @Input() userProfile: FullUser | undefined;

    constructor() {
    }
}
