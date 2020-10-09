import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemSoldContractDetailsComponent} from "@sold/item-sold-contract/item-sold-contract-details/item-sold-contract-details.component";

describe("ItemSoldContractDetailsComponent", () => {
    let component: ItemSoldContractDetailsComponent;
    let fixture: ComponentFixture<ItemSoldContractDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemSoldContractDetailsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemSoldContractDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
