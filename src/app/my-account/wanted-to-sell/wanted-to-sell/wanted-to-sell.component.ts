import {Component, Input} from "@angular/core";
import {FullUser} from "@my-account/data/FullUser";

@Component({
    selector: "wanted-to-sell",
    templateUrl: "./wanted-to-sell.component.html",
    styleUrls: ["./wanted-to-sell.component.scss"]
})
export class WantedToSellComponent {

    @Input() userProfile: FullUser | undefined;

    constructor() {
    }
}
