import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SimpleConversation} from "@my-account/data/SimpleConversation";

@Component({
    selector: "item-sold-conversation",
    templateUrl: "./item-sold-conversation.component.html",
    styleUrls: ["./item-sold-conversation.component.scss"]
})
export class ItemSoldConversationComponent implements OnInit {

    @Input() conversation!: SimpleConversation;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    navigateToOffer() {
        this.router.navigateByUrl("/offer").then(_ => {
        });
    }
}
