import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemDescriptionComponent} from "./item-description.component";
import {Item} from "@items/data/Item";
import {UsedStatusDto} from "@items/data/UsedStatus";

describe("ItemDescriptionComponent", () => {
    let component: ItemDescriptionComponent;
    let fixture: ComponentFixture<ItemDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemDescriptionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemDescriptionComponent);
        component = fixture.componentInstance;
        component.item = new Item({
            id: 1,
            title: "title",
            description: "description",
            price: 1.234,
            addedBy: {
                id: 10,
                ethereumAddress: null,
                username: "owner"
            },
            addedOn: new Date(Date.now()).toISOString(),
            category: {
                id: 10,
                name: "category"
            },
            usedStatus: UsedStatusDto.USED,
            photoUrls: ["url1", "url2"],
            closedOn: null
        });
        fixture.detectChanges();
    });
});
