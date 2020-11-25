import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemsSoldComponent} from "@my-account/items-sold/items-sold.component";
import {RouterTestingModule} from "@angular/router/testing";

describe("ItemsSoldComponent", () => {
    let component: ItemsSoldComponent;
    let fixture: ComponentFixture<ItemsSoldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
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
