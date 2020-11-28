import {TestBed, fakeAsync} from "@angular/core/testing";

import {USER_API_URL, UserService} from "@my-account/user-service/user.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ItemWantedToSell, ItemWantedToSellResponse} from "@my-account/data/items/ItemWantedToSell";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";
import {OfferStatusDto} from "@conversation/data/OfferStatus";
import {HttpErrorResponse} from "@angular/common/http";
import {ItemSoldResponse, ItemSold} from "@my-account/data/items/ItemSold";
import {ItemWantedToBuy, ItemWantedToBuyResponse} from "@my-account/data/items/ItemWantedToBuy";
import {ItemBought, ItemBoughtResponse} from "@my-account/data/items/ItemBought";

fdescribe("UserService", () => {
    let service: UserService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        service = TestBed.inject(UserService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpController.verify();
    });

    describe("getItemsWantedToSell()", () => {
        const mockItemResponses: ItemWantedToSellResponse[] = [
            {
                id: 10,
                title: "title",
                description: "description",
                price: 123.456,
                addedBy: {
                    id: 10,
                    ethereumAddress: "not an address",
                    username: "owner"
                },
                addedOn: Date.now().toString(),
                category: {
                    id: 10,
                    name: "category name"
                },
                usedStatus: UsedStatusDto.NEW,
                photoUrl: "photo URL",
                conversations: [
                    {
                        id: 10,
                        interestedUser: {
                            id: 11,
                            ethereumAddress: "also not an address",
                            username: "interested 1"
                        },
                        lastMessage: {
                            id: 11,
                            sendingUser: {
                                id: 11,
                                ethereumAddress: "also not an address",
                                username: "interested 1"
                            },
                            sentOn: Date.now().toString(),
                            textContent: "message content"
                        },
                        lastOffer: {
                            id: 11,
                            type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                            price: 123.000,
                            offerStatus: OfferStatusDto.AWAITING,
                            contractAddress: null
                        }
                    },
                    {
                        id: 12,
                        interestedUser: {
                            id: 12,
                            ethereumAddress: "also not an address",
                            username: "interested 2"
                        },
                        lastMessage: {
                            id: 12,
                            sendingUser: {
                                id: 12,
                                ethereumAddress: "also not an address",
                                username: "interested 2"
                            },
                            sentOn: Date.now().toString(),
                            textContent: "message content"
                        },
                        lastOffer: {
                            id: 12,
                            type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                            price: 123.000,
                            offerStatus: OfferStatusDto.AWAITING,
                            contractAddress: null
                        }
                    },
                ]
            }
        ];
        const expectedUrl = `${USER_API_URL}/wantedToSell`;

        it("should return items", fakeAsync(() => {
            const expectedItems = mockItemResponses.map(response => new ItemWantedToSell(response));

            service.getItemsWantedToSell().subscribe(responses => {
                expect(responses.length).toEqual(expectedItems.length);
                expect(responses.every((item, index) => {
                    item.equals(expectedItems[index]);
                }));
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(mockItemResponses);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.getItemsWantedToSell().subscribe(_ => {
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush([{key: "value", another: "value too"}]);
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.getItemsWantedToSell().subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });

    describe("getItemsSold()", () => {
        const mockItemResponses: ItemSoldResponse[] = [
            {
                id: 11,
                title: "title 1",
                description: "description",
                price: 123.456,
                addedBy: {
                    id: 10,
                    ethereumAddress: "not an address",
                    username: "owner"
                },
                addedOn: Date.now().toString(),
                category: {
                    id: 10,
                    name: "category name"
                },
                usedStatus: UsedStatusDto.NEW,
                photoUrl: "photo URL",
                offer: {
                    id: 10,
                    type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                    price: 123.000,
                    offerStatus: OfferStatusDto.AWAITING,
                    contractAddress: null
                }
            },
            {
                id: 12,
                title: "title 2",
                description: "description",
                price: 123.456,
                addedBy: {
                    id: 10,
                    ethereumAddress: "not an address",
                    username: "owner"
                },
                addedOn: Date.now().toString(),
                category: {
                    id: 10,
                    name: "category name"
                },
                usedStatus: UsedStatusDto.NEW,
                photoUrl: "photo URL",
                offer: {
                    id: 10,
                    type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                    price: 123.000,
                    offerStatus: OfferStatusDto.AWAITING,
                    contractAddress: null
                }
            }
        ];
        const expectedUrl = `${USER_API_URL}/sold`;

        it("should return items", fakeAsync(() => {
            const expectedItems = mockItemResponses.map(response => new ItemSold(response));

            service.getItemsSold().subscribe(responses => {
                expect(responses.length).toEqual(expectedItems.length);
                expect(responses.every((item, index) => {
                    item.equals(expectedItems[index]);
                }));
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(mockItemResponses);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.getItemsSold().subscribe(_ => {
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush([{key: "value", another: "value too"}]);
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.getItemsSold().subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });

    describe("getItemsWantedToBuy()", () => {
        const mockItemResponses: ItemWantedToBuyResponse[] = [
            {
                id: 11,
                title: "title 1",
                description: "description",
                price: 123.456,
                addedBy: {
                    id: 10,
                    ethereumAddress: "not an address",
                    username: "owner"
                },
                addedOn: Date.now().toString(),
                category: {
                    id: 10,
                    name: "category name"
                },
                usedStatus: UsedStatusDto.NEW,
                photoUrl: "photo URL",
                conversation: {
                    id: 11,
                    interestedUser: {
                        id: 11,
                        ethereumAddress: "also not an address",
                        username: "interested"
                    },
                    lastMessage: {
                        id: 11,
                        sendingUser: {
                            id: 11,
                            ethereumAddress: "also not an address",
                            username: "interested"
                        },
                        sentOn: Date.now().toString(),
                        textContent: "message content"
                    },
                    lastOffer: {
                        id: 11,
                        type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                        price: 123.000,
                        offerStatus: OfferStatusDto.AWAITING,
                        contractAddress: null
                    }
                }
            },
            {
                id: 12,
                title: "title 2",
                description: "description",
                price: 123.456,
                addedBy: {
                    id: 10,
                    ethereumAddress: "not an address",
                    username: "owner"
                },
                addedOn: Date.now().toString(),
                category: {
                    id: 10,
                    name: "category name"
                },
                usedStatus: UsedStatusDto.NEW,
                photoUrl: "photo URL",
                conversation: {
                    id: 12,
                    interestedUser: {
                        id: 11,
                        ethereumAddress: "also not an address",
                        username: "interested"
                    },
                    lastMessage: {
                        id: 12,
                        sendingUser: {
                            id: 11,
                            ethereumAddress: "also not an address",
                            username: "interested"
                        },
                        sentOn: Date.now().toString(),
                        textContent: "message content"
                    },
                    lastOffer: {
                        id: 12,
                        type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                        price: 123.000,
                        offerStatus: OfferStatusDto.AWAITING,
                        contractAddress: null
                    }
                }
            }
        ];
        const expectedUrl = `${USER_API_URL}/wantedToBuy`;

        it("should return items", fakeAsync(() => {
            const expectedItems = mockItemResponses.map(response => new ItemWantedToBuy(response));

            service.getItemsWantedToBuy().subscribe(responses => {
                expect(responses.length).toEqual(expectedItems.length);
                expect(responses.every((item, index) => {
                    item.equals(expectedItems[index]);
                }));
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(mockItemResponses);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.getItemsWantedToBuy().subscribe(_ => {
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush([{key: "value", another: "value too"}]);
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.getItemsWantedToBuy().subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });

    describe("getItemsBought()", () => {
        const mockItemResponses: ItemBoughtResponse[] = [
            {
                id: 11,
                title: "title 1",
                description: "description",
                price: 123.456,
                addedBy: {
                    id: 10,
                    ethereumAddress: "not an address",
                    username: "owner"
                },
                addedOn: Date.now().toString(),
                category: {
                    id: 10,
                    name: "category name"
                },
                usedStatus: UsedStatusDto.NEW,
                photoUrl: "photo URL",
                offer: {
                    id: 10,
                    type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                    price: 123.000,
                    offerStatus: OfferStatusDto.AWAITING,
                    contractAddress: null
                }
            },
            {
                id: 12,
                title: "title 2",
                description: "description",
                price: 123.456,
                addedBy: {
                    id: 10,
                    ethereumAddress: "not an address",
                    username: "owner"
                },
                addedOn: Date.now().toString(),
                category: {
                    id: 10,
                    name: "category name"
                },
                usedStatus: UsedStatusDto.NEW,
                photoUrl: "photo URL",
                offer: {
                    id: 11,
                    type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                    price: 123.000,
                    offerStatus: OfferStatusDto.AWAITING,
                    contractAddress: null
                }
            }
        ];
        const expectedUrl = `${USER_API_URL}/bought`;

        it("should return items", fakeAsync(() => {
            const expectedItems = mockItemResponses.map(response => new ItemBought(response));

            service.getItemsBought().subscribe(responses => {
                expect(responses.length).toEqual(expectedItems.length);
                expect(responses.every((item, index) => {
                    item.equals(expectedItems[index]);
                }));
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(mockItemResponses);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.getItemsBought().subscribe(_ => {
                fail("error callback should get executed");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush([{key: "value", another: "value too"}]);
        }));

        it("should throw an error when presented with an error response", fakeAsync(() => {
            const expectedStatus = 500;
            const expectedErrorObject = {key: "message"};

            service.getItemsBought().subscribe(_ => {
                fail("error callback should get executed");
            }, (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
                expect(error.status).toEqual(expectedStatus);
                expect(error.error).toEqual(expectedErrorObject);
            });

            const testRequest = httpController.expectOne(expectedUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(expectedErrorObject, {status: expectedStatus, statusText: "Internal Server Error"});
        }));
    });
});
