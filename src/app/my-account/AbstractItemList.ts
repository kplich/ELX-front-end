import {AbstractUserItem} from "./data/items/AbstractUserItem";
import {Component, Input} from "@angular/core";

@Component({
    template: ""
})
export abstract class AbstractUserItemListComponent<I extends AbstractUserItem> {
    @Input() items!: I;
}
