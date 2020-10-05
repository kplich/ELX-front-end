import {Component, OnInit, Input} from "@angular/core";
import {FullUser} from "@my-account/data/FullUser";

@Component({
    selector: "app-sold-by-me",
    templateUrl: "./sold-by-me.component.html",
    styleUrls: ["./sold-by-me.component.scss"]
})
export class SoldByMeComponent implements OnInit {

    @Input() userProfile: FullUser | undefined;

    constructor() {
    }

    ngOnInit(): void {
    }

}
