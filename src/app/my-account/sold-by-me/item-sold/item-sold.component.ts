import {Component, Input, OnInit} from "@angular/core";
import {ItemSoldByMe} from "@my-account/data/ItemSoldByMe";

@Component({
    selector: "item-sold",
    templateUrl: "./item-sold.component.html",
    styleUrls: ["./item-sold.component.scss"]
})
export class ItemSoldComponent implements OnInit {

    @Input() item!: ItemSoldByMe;

    constructor() {
    }

    ngOnInit() {
    }



}
