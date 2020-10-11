import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UserItemContractPlainAdvanceComponent} from "@my-account/user-item-contract/user-item-contract-plain-advance/user-item-contract-plain-advance.component";

describe("UserItemContractPlainAdvanceComponent", () => {
    let component: UserItemContractPlainAdvanceComponent;
    let fixture: ComponentFixture<UserItemContractPlainAdvanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserItemContractPlainAdvanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserItemContractPlainAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
