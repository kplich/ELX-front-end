import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemsWantedToSellComponent} from "@my-account/items-wanted-to-sell/items-wanted-to-sell.component";

describe("ItemsWantedToSellComponent", () => {
    let component: ItemsWantedToSellComponent;
    let fixture: ComponentFixture<ItemsWantedToSellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsWantedToSellComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsWantedToSellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
