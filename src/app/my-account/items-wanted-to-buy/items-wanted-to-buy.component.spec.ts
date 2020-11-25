import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemsWantedToBuyComponent} from "@my-account/items-wanted-to-buy/items-wanted-to-buy.component";
import {RouterTestingModule} from "@angular/router/testing";

describe("ItemsWantedToBuyComponent", () => {
    let component: ItemsWantedToBuyComponent;
    let fixture: ComponentFixture<ItemsWantedToBuyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ItemsWantedToBuyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsWantedToBuyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
