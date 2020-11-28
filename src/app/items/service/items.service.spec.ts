import {TestBed, fakeAsync} from "@angular/core/testing";
import {CATEGORIES_API_URL, ITEMS_API_URL, ItemsService} from "@items/service/items.service";
import {HttpTestingController, HttpClientTestingModule} from "@angular/common/http/testing";
import {CategoryResponse, Item, ItemResponse, NewOrUpdatedItemRequest} from "@items/data/Item";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {HttpErrorResponse} from "@angular/common/http";

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

            const testRequest = httpController.expectOne(`${ITEMS_API_URL}/${itemId}`);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(mockItemResponse);
        }));

        it("should throw an error when presented with a wrong object", fakeAsync(() => {
            service.getItem(itemId).subscribe(_ => {
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(`${ITEMS_API_URL}/${itemId}`);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush({key: "value", another: "value too"});
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.getItem(itemId).subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(`${ITEMS_API_URL}/${itemId}`);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });

    describe("getAllItems()", () => {
        const mockItemResponses: ItemResponse[] = [
            {
                id: 10,
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
            },
            {
                id: 11,
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
            },
            {
                id: 12,
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
            }
        ];

        it("should return items", fakeAsync(() => {
            const expectedItems = mockItemResponses.map(response => new Item(response));

            service.getAllItems().subscribe(items => {
                expect(items.length).toEqual(expectedItems.length);
                expect(items.every((item, i) => {
                    item.equals(expectedItems[i]);
                }));
            });

            const testRequest = httpController.expectOne(ITEMS_API_URL);
            expect(testRequest.request.method).toEqual("GET");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush(mockItemResponses);
        }));

        it("should throw an error when presented with a wrong response", fakeAsync(() => {
            service.getAllItems().subscribe(_ => {
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(ITEMS_API_URL);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush([{key: "value", another: "value too"}]);
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.getAllItems().subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(ITEMS_API_URL);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });

    describe("getCategories()", () => {
        const mockCategoryResponses: CategoryResponse[] = [
            {id: 10, name: "Category"},
            {id: 11, name: "Category"},
            {id: 12, name: "Category"}
        ];

        it("should return categories", fakeAsync(() => {
            const expectedCategories = mockCategoryResponses;

            service.getCategories().subscribe(categories => {
                expect(categories.length).toEqual(expectedCategories.length);
                expect(categories.every((category, i) => {
                    return category === expectedCategories[i];
                }));
            });

            const testRequest = httpController.expectOne(CATEGORIES_API_URL);
            expect(testRequest.request.method).toEqual("GET");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush(mockCategoryResponses);
        }));

        // until category stays an interface, this will fail
        xit("should throw an error when presented with a wrong response", fakeAsync(() => {
            service.getCategories().subscribe(categories => {
                console.log(categories);
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(CATEGORIES_API_URL);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush([{key: "value", another: "value too"}]);
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.getCategories().subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(CATEGORIES_API_URL);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });

    describe("addNewItem()", () => {
        const newItemRequest: NewOrUpdatedItemRequest = {
            title: "title",
            description: "",
            price: 125,
            category: 1,
            usedStatus: "",
            photos: []
        };
        const mockItemResponse: ItemResponse = {
            id: 1,
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

            service.addNewItem(newItemRequest).subscribe(item => {
                expect(item.equals(expectedItem)).toBeTruthy();
            });

            const testRequest = httpController.expectOne(ITEMS_API_URL);
            expect(testRequest.request.method).toEqual("POST");
            expect(testRequest.request.body).toBeDefined();
            expect(testRequest.request.body).toEqual(newItemRequest);
            testRequest.flush(mockItemResponse);
        }));

        it("should throw an error when presented with a wrong object", fakeAsync(() => {
            service.addNewItem(newItemRequest).subscribe(_ => {
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(ITEMS_API_URL);
            expect(testRequest.request.method).toEqual("POST");
            expect(testRequest.request.body).toBeDefined();
            expect(testRequest.request.body).toEqual(newItemRequest);
            testRequest.flush({key: "value", another: "value too"});
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.addNewItem(newItemRequest).subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(ITEMS_API_URL);
            expect(testRequest.request.method).toEqual("POST");
            expect(testRequest.request.body).toBeDefined();
            expect(testRequest.request.body).toEqual(newItemRequest);
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });

    describe("closeItem()", () => {
        const itemId = 1;
        const mockItemResponse: ItemResponse = {
            id: 1,
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

            service.closeItem(itemId).subscribe(item => {
                expect(item.equals(expectedItem)).toBeTruthy();
            });

            const testRequest = httpController.expectOne(`${ITEMS_API_URL}/${itemId}/close`);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush(mockItemResponse);
        }));

        it("should throw an error when presented with a wrong object", fakeAsync(() => {
            service.closeItem(itemId).subscribe(_ => {
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(`${ITEMS_API_URL}/${itemId}/close`);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush({key: "value", another: "value too"});
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.closeItem(itemId).subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(`${ITEMS_API_URL}/${itemId}/close`);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });

    describe("updateItem()", () => {
        const newItemRequest: NewOrUpdatedItemRequest = {
            title: "title",
            description: "",
            price: 125,
            category: 1,
            usedStatus: "",
            photos: []
        };
        const mockItemResponse: ItemResponse = {
            id: 1,
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

            service.updateItem(newItemRequest).subscribe(item => {
                expect(item.equals(expectedItem)).toBeTruthy();
            });

            const testRequest = httpController.expectOne(ITEMS_API_URL);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeDefined();
            expect(testRequest.request.body).toEqual(newItemRequest);
            testRequest.flush(mockItemResponse);
        }));

        it("should throw an error when presented with a wrong object", fakeAsync(() => {
            service.updateItem(newItemRequest).subscribe(_ => {
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(ITEMS_API_URL);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeDefined();
            expect(testRequest.request.body).toEqual(newItemRequest);
            testRequest.flush({key: "value", another: "value too"});
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.updateItem(newItemRequest).subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(ITEMS_API_URL);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeDefined();
            expect(testRequest.request.body).toEqual(newItemRequest);
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });
});
