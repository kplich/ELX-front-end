import { Component, Input } from "@angular/core";
import {FullUser} from "@my-account/data/FullUser";

@Component({
  selector: "items-bought",
  templateUrl: "./bought.component.html",
  styleUrls: ["./bought.component.scss"]
})
export class BoughtComponent {

    @Input() userProfile: FullUser | undefined;

}
