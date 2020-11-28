import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UserItemContractDoubleAdvanceComponent} from "@my-account/user-item-contract/user-item-contract-double-advance/user-item-contract-double-advance.component";
import {MaterialModule} from "@material/material.module";
import {WEB3} from "@shared/web3-injection-token";

describe("UserItemContractDoubleAdvanceComponent", () => {
    let component: UserItemContractDoubleAdvanceComponent;
    let fixture: ComponentFixture<UserItemContractDoubleAdvanceComponent>;

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
            declarations: [UserItemContractDoubleAdvanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserItemContractDoubleAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
