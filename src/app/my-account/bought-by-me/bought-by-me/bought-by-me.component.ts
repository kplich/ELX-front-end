import { Component, Input } from "@angular/core";
import {FullUser} from "@my-account/data/FullUser";

@Component({
  selector: "app-bought-by-me",
  templateUrl: "./bought-by-me.component.html",
  styleUrls: ["./bought-by-me.component.scss"]
})
export class BoughtByMeComponent {

    @Input() userProfile: FullUser | undefined;

}
