import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemsSoldComponent} from "@my-account/items-sold/items-sold.component";

describe("ItemsSoldComponent", () => {
    let component: ItemsSoldComponent;
    let fixture: ComponentFixture<ItemsSoldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsSoldComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsSoldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
