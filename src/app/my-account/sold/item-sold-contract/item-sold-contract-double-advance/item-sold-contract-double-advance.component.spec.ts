import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemSoldContractDoubleAdvanceComponent} from "@sold/item-sold-contract/item-sold-contract-double-advance/item-sold-contract-double-advance.component";

describe("ItemSoldContractDoubleAdvanceComponent", () => {
    let component: ItemSoldContractDoubleAdvanceComponent;
    let fixture: ComponentFixture<ItemSoldContractDoubleAdvanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemSoldContractDoubleAdvanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemSoldContractDoubleAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
