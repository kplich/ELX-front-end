import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemPhotosComponent} from "./item-photos.component";
import {Item} from "@items/data/Item";
import {UsedStatusDto} from "@items/data/UsedStatus";

describe("ItemPhotosComponent", () => {
    let component: ItemPhotosComponent;
    let fixture: ComponentFixture<ItemPhotosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemPhotosComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemPhotosComponent);
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
