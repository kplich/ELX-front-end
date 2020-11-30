import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UserItemContractPlainAdvanceComponent} from "@my-account/user-item-contract/user-item-contract-plain-advance/user-item-contract-plain-advance.component";
import {MaterialModule} from "@material/material.module";
import {WEB3} from "@shared/web3-injection-token";

describe("UserItemContractPlainAdvanceComponent", () => {
    let component: UserItemContractPlainAdvanceComponent;
    let fixture: ComponentFixture<UserItemContractPlainAdvanceComponent>;

    const web3Mock = {
        eth: {
            getAccounts: () => {
                return Promise.resolve(["account"]);
            },
            getBalance: (address: string) => {
                return Promise.resolve("1");
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule],
            providers: [{provide: WEB3, useValue: web3Mock}],
            declarations: [UserItemContractPlainAdvanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserItemContractPlainAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
