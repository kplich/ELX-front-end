import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemWantedConversationComponent} from "wanted-to-buy/item-wanted-conversation/item-wanted-conversation.component";

describe("ItemWantedConversationComponent", () => {
    let component: ItemWantedConversationComponent;
    let fixture: ComponentFixture<ItemWantedConversationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemWantedConversationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemWantedConversationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
