import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemWantedDescriptionComponent} from "wanted-to-buy/item-wanted-description/item-wanted-description.component";

describe("ItemWantedDescriptionComponent", () => {
    let component: ItemWantedDescriptionComponent;
    let fixture: ComponentFixture<ItemWantedDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemWantedDescriptionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemWantedDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
