import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "item-sold-offer",
  templateUrl: "./item-sold-offer.component.html",
  styleUrls: ["./item-sold-offer.component.scss"]
})
export class ItemSoldOfferComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToOffer() {
    this.router.navigateByUrl("/offer").then(_ => {});
  }
}
