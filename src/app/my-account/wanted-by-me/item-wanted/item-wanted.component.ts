import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {ItemWantedByMe} from "@my-account/data/ItemWantedByMe";

@Component({
    selector: "item-wanted",
    templateUrl: "./item-wanted.component.html",
    styleUrls: ["./item-wanted.component.scss"]
})
export class ItemWantedComponent {

    @Input() item!: ItemWantedByMe;

    constructor(private router: Router) {
    }

    navigateToItem() {
        this.router.navigateByUrl(`/items/${this.item?.id}`).then(() => {
        });
    }

    navigateToConversation() {
        this.router.navigateByUrl(`/items/${this.item?.id}/conversation`)
            .then(() => {
            });
    }
}
