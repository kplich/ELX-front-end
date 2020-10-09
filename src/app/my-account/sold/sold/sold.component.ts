import {Component, Input} from "@angular/core";
import {FullUser} from "@my-account/data/FullUser";

@Component({
    selector: "items-sold",
    templateUrl: "./sold.component.html",
    styleUrls: ["./sold.component.scss"]
})
export class SoldComponent {

    @Input() userProfile: FullUser | undefined;

    constructor() {
    }
}
