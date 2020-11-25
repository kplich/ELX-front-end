import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemWantedToBuyComponent} from "@my-account/item-wanted-to-buy/item-wanted-to-buy.component";
import {RouterTestingModule} from "@angular/router/testing";

describe("ItemWantedToBuyComponent", () => {
    let component: ItemWantedToBuyComponent;
    let fixture: ComponentFixture<ItemWantedToBuyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ItemWantedToBuyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemWantedToBuyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
