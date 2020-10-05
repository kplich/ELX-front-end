import {Component, OnInit} from "@angular/core";
import {FullUser} from "@my-account/data/FullUser";
import { Observable, of } from "rxjs";
import {UserService} from "@my-account/user-service/user.service";

@Component({
    selector: "my-account",
    templateUrl: "./my-account.component.html",
    styleUrls: ["./my-account.component.scss"]
})
export class MyAccountComponent implements OnInit {

    user$: Observable<FullUser | undefined> = of(undefined);

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.user$ = this.userService.getFullUser();
    }

}
