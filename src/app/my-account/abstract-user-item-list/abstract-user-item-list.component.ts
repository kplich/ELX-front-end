import {AbstractUserItem} from "@my-account/data/items/AbstractUserItem";
import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    template: ""
})
export abstract class AbstractUserItemListComponent<I extends AbstractUserItem> {
    @Input() items!: I[];

    constructor(private router: Router) {
    }

    get itemListIsEmpty(): boolean {
        return this.items.length === 0;
    }

    navigateToAdding() {
        this.router.navigateByUrl("/items/add");
    }

    navigateToBrowsing() {
        this.router.navigateByUrl("/items");
    }
}
