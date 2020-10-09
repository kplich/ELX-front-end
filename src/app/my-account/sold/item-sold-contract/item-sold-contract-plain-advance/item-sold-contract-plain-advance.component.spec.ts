import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemSoldContractPlainAdvanceComponent} from "@sold/item-sold-contract/item-sold-contract-plain-advance/item-sold-contract-plain-advance.component";

describe("ItemSoldContractPlainAdvanceComponent", () => {
    let component: ItemSoldContractPlainAdvanceComponent;
    let fixture: ComponentFixture<ItemSoldContractPlainAdvanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemSoldContractPlainAdvanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemSoldContractPlainAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
