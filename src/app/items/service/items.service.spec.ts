import {TestBed, fakeAsync} from "@angular/core/testing";

import {ItemsService} from "@items/service/items.service";
import {HttpTestingController, HttpClientTestingModule} from "@angular/common/http/testing";
import {Item, ItemResponse} from "@items/data/Item";
import {UsedStatusDto} from "@items/data/UsedStatus";

describe("ItemsService", () => {
    let service: ItemsService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ItemsService]
        });
        service = TestBed.inject(ItemsService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpController.verify();
    });

    describe("getItem()", () => {
        const itemId = 10;
        const mockItemResponse: ItemResponse = {
                id: itemId,
                title: "title",
                description: "description",
                price: 1.234,
                addedBy: {
                    id: 10,
                    ethereumAddress: null,
                    username: "owner"
                },
                addedOn: Date.now().toLocaleString(),
                category: {
                    id: 10,
                    name: "category"
                },
                usedStatus: UsedStatusDto.USED,
                photoUrls: ["url1", "url2"],
                closedOn: null
            };

        it("should return an item", fakeAsync(() => {
            const expectedItem = new Item(mockItemResponse);

            service.getItem(itemId).subscribe(item => {
                expect(item.equals(expectedItem)).toBeTruthy();
            });
        }));
    });
});
