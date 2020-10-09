import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemSoldDescriptionComponent} from "@sold/item-sold-description/item-sold-description.component";

describe("ItemSoldDescriptionComponent", () => {
    let component: ItemSoldDescriptionComponent;
    let fixture: ComponentFixture<ItemSoldDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemSoldDescriptionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemSoldDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
