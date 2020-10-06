import {Component, Input} from "@angular/core";
import {FullUser} from "@my-account/data/FullUser";

@Component({
    selector: "app-wanted-by-me",
    templateUrl: "./wanted-by-me.component.html",
    styleUrls: ["./wanted-by-me.component.scss"]
})
export class WantedByMeComponent {

    @Input() userProfile: FullUser | undefined;

    constructor() {
    }
}
