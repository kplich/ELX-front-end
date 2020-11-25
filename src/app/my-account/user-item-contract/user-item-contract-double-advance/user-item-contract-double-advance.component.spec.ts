import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UserItemContractDoubleAdvanceComponent} from "@my-account/user-item-contract/user-item-contract-double-advance/user-item-contract-double-advance.component";
import {MaterialModule} from "@material/material.module";

describe("UserItemContractDoubleAdvanceComponent", () => {
    let component: UserItemContractDoubleAdvanceComponent;
    let fixture: ComponentFixture<UserItemContractDoubleAdvanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule],
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
