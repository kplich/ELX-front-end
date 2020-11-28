import {fakeAsync, TestBed} from "@angular/core/testing";

import {ConversationService, ITEMS_API_URL} from "@conversation/service/conversation/conversation.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Conversation, ConversationResponse} from "@conversation/data/Conversation";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {HttpErrorResponse} from "@angular/common/http";
import {NewMessageRequest} from "@conversation/data/NewMessageRequest";

describe("ConversationService", () => {

    let service: ConversationService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConversationService]
        });
        service = TestBed.inject(ConversationService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpController.verify();
    });

    describe("getConversation()", () => {

        const itemId = 10;
        const mockConversationResponse: ConversationResponse = {
            id: 10,
            item: {
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
            },
            interestedUser: {
                id: 11,
                ethereumAddress: null,
                username: "interested"
            },
            messages: [
                {
                    id: 11,
                    sendingUser: {
                        id: 11,
                        ethereumAddress: null,
                        username: "interested"
                    },
                    sentOn: Date.now().toLocaleString(),
                    textContent: "message 1",
                    offer: null
                },
                {
                    id: 12,
                    sendingUser: {
                        id: 10,
                        ethereumAddress: null,
                        username: "owner"
                    },
                    sentOn: Date.now().toString(),
                    textContent: "message 2",
                    offer: null
                }
            ]
        };

        it("should return a conversation", fakeAsync(() => {
            const expectedConversation = new Conversation(mockConversationResponse);

            service.getConversation(itemId).subscribe(conversation => {
                expect(conversation.equals(expectedConversation)).toBeTruthy();
            }, fail);

            const testRequest = httpController.expectOne(`${ITEMS_API_URL}/${itemId}/conversation`);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(mockConversationResponse);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.getConversation(itemId).subscribe(_ => {
                fail("should execute error callback");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(`${ITEMS_API_URL}/${itemId}/conversation`);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush({key: "value"});
        }));

        it("should return a HttpErrorResponse on error", fakeAsync(() => {
            const expectedMessage = "expected message";

            service.getConversation(itemId).subscribe({
                next: _ => fail("should have failed with a 404"),
                error: (error: HttpErrorResponse) => {
                    expect(error.status).toEqual(404);
                    expect(error.error).toEqual(expectedMessage);
                }
            });

            const req = httpController.expectOne(`${ITEMS_API_URL}/${itemId}/conversation`);

            req.flush(expectedMessage, {status: 404, statusText: "Not Found"});
        }));
    });

    describe("getConversationWithSubject()", () => {
        const itemId = 10;
        const interestedUserId = 100;
        const expectedApiUrl = `${ITEMS_API_URL}/${itemId}/conversation?subjectId=${interestedUserId}`;

        const mockConversationResponse: ConversationResponse = {
            id: 10,
            item: {
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
            },
            interestedUser: {
                id: interestedUserId,
                ethereumAddress: null,
                username: "interested"
            },
            messages: [
                {
                    id: 11,
                    sendingUser: {
                        id: 11,
                        ethereumAddress: null,
                        username: "interested"
                    },
                    sentOn: Date.now().toLocaleString(),
                    textContent: "message 1",
                    offer: null
                },
                {
                    id: 12,
                    sendingUser: {
                        id: 10,
                        ethereumAddress: null,
                        username: "owner"
                    },
                    sentOn: Date.now().toString(),
                    textContent: "message 2",
                    offer: null
                }
            ]
        };

        it("should return a conversation", fakeAsync(() => {
            const expectedConversation = new Conversation(mockConversationResponse);

            service.getConversationWithSubject(itemId, interestedUserId).subscribe(conversation => {
                expect(conversation.equals(expectedConversation)).toBeTruthy();
            }, fail);

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(mockConversationResponse);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.getConversationWithSubject(itemId, interestedUserId).subscribe(_ => {
                fail("should execute error callback");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush({key: "value"});
        }));

        it("should return a HttpErrorResponse on 404", fakeAsync(() => {
            const expectedMessage = "expected message";

            service.getConversationWithSubject(itemId, interestedUserId).subscribe({
                next: _ => fail("should have failed because responded with a 404"),
                error: (error: HttpErrorResponse) => {
                    expect(error.status).toEqual(404);
                    expect(error.error).toEqual(expectedMessage);
                }
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("GET");
            testRequest.flush(expectedMessage, {status: 404, statusText: "Not Found"});
        }));
    });

    describe("sendMessage()", () => {
        const itemId = 10;
        const mockConversationResponse: ConversationResponse = {
            id: 10,
            item: {
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
            },
            interestedUser: {
                id: 11,
                ethereumAddress: null,
                username: "interested"
            },
            messages: [
                {
                    id: 11,
                    sendingUser: {
                        id: 11,
                        ethereumAddress: null,
                        username: "interested"
                    },
                    sentOn: Date.now().toLocaleString(),
                    textContent: "message 1",
                    offer: null
                },
                {
                    id: 12,
                    sendingUser: {
                        id: 10,
                        ethereumAddress: null,
                        username: "owner"
                    },
                    sentOn: Date.now().toString(),
                    textContent: "message 2",
                    offer: null
                }
            ]
        };
        const expectedApiUrl = `${ITEMS_API_URL}/${itemId}/conversation`;

        const messageRequest: NewMessageRequest = {
            content: "message"
        };

        it("should send message and return a conversation", fakeAsync(() => {
            const expectedConversation = new Conversation(mockConversationResponse);

            service.sendMessage(itemId, messageRequest).subscribe({
                next: conversation => {
                    expect(conversation.equals(expectedConversation));
                },
                error: _ => {
                    fail("should not execute error callback");
                }
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("POST");
            expect(testRequest.request.body).toEqual(messageRequest);
            testRequest.flush(mockConversationResponse);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.sendMessage(itemId, messageRequest).subscribe(_ => {
                fail("should execute error callback");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("POST");
            expect(testRequest.request.body).toEqual(messageRequest);
            testRequest.flush({key: "value"});
        }));

        it("should return a HttpErrorResponse on an error", fakeAsync(() => {
            const expectedStatus = 400;
            const expectedMessage = "Error message";

            service.sendMessage(itemId, messageRequest).subscribe({
                next: _ => fail("should have failed with an error"),
                error: (response: HttpErrorResponse) => {
                    expect(response.status).toEqual(expectedStatus);
                    expect(response.error).toEqual(expectedMessage);
                }
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("POST");
            expect(testRequest.request.body).toEqual(messageRequest);
            testRequest.flush(expectedMessage, {status: expectedStatus, statusText: "Error"});
        }));
    });

    describe("sendMessageWithSubject()", () => {
        const itemId = 10;
        const subjectId = 11;
        const expectedApiUrl = `${ITEMS_API_URL}/${itemId}/conversation?subjectId=${subjectId}`;
        const mockConversationResponse: ConversationResponse = {
            id: 10,
            item: {
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
            },
            interestedUser: {
                id: 11,
                ethereumAddress: null,
                username: "interested"
            },
            messages: [
                {
                    id: 11,
                    sendingUser: {
                        id: 11,
                        ethereumAddress: null,
                        username: "interested"
                    },
                    sentOn: Date.now().toLocaleString(),
                    textContent: "message 1",
                    offer: null
                },
                {
                    id: 12,
                    sendingUser: {
                        id: 10,
                        ethereumAddress: null,
                        username: "owner"
                    },
                    sentOn: Date.now().toString(),
                    textContent: "message 2",
                    offer: null
                }
            ]
        };

        const messageRequest: NewMessageRequest = {
            content: "message"
        };

        it("should send message and return a conversation", fakeAsync(() => {
            const expectedConversation = new Conversation(mockConversationResponse);

            service.sendMessageWithSubject(itemId, messageRequest, subjectId).subscribe({
                next: conversation => {
                    expect(conversation.equals(expectedConversation));
                },
                error: _ => {
                    fail("should not execute error callback");
                }
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("POST");
            expect(testRequest.request.body).toEqual(messageRequest);
            testRequest.flush(mockConversationResponse);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.sendMessageWithSubject(itemId, messageRequest, subjectId).subscribe(_ => {
                fail("should execute error callback");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("POST");
            expect(testRequest.request.body).toEqual(messageRequest);
            testRequest.flush({key: "value"});
        }));

        it("should return a HttpErrorResponse on an error", fakeAsync(() => {
            const expectedStatus = 400;
            const expectedMessage = "Error message";

            service.sendMessageWithSubject(itemId, messageRequest, subjectId).subscribe({
                next: _ => fail("should have failed with an error"),
                error: (response: HttpErrorResponse) => {
                    expect(response.status).toEqual(expectedStatus);
                    expect(response.error).toEqual(expectedMessage);
                }
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("POST");
            expect(testRequest.request.body).toEqual(messageRequest);
            testRequest.flush(expectedMessage, {status: expectedStatus, statusText: "Error"});
        }));
    });

    describe("acceptOffer()", () => {
        const offerId = 10;
        const contractAddress = "address";
        const expectedApiUrl = `${ITEMS_API_URL}/${offerId}/accept`;
        const mockConversationResponse: ConversationResponse = {
            id: 10,
            item: {
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
            interestedUser: {
                id: 11,
                ethereumAddress: null,
                username: "interested"
            },
            messages: [
                {
                    id: 11,
                    sendingUser: {
                        id: 11,
                        ethereumAddress: null,
                        username: "interested"
                    },
                    sentOn: Date.now().toLocaleString(),
                    textContent: "message 1",
                    offer: null
                },
                {
                    id: 12,
                    sendingUser: {
                        id: 10,
                        ethereumAddress: null,
                        username: "owner"
                    },
                    sentOn: Date.now().toString(),
                    textContent: "message 2",
                    offer: null
                }
            ]
        };

        it("should return a conversation", fakeAsync(() => {
            const expectedConversation = new Conversation(mockConversationResponse);

            service.acceptOffer(offerId, contractAddress).subscribe(conversation => {
                expect(conversation.equals(expectedConversation));
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toEqual({contractAddress});
            testRequest.flush(mockConversationResponse);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.acceptOffer(offerId, contractAddress).subscribe(_ => {
                fail("should execute error callback");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toEqual({contractAddress});
            testRequest.flush({key: "value"});
        }));

        it("should return a HttpErrorResponse on error", fakeAsync(() => {
            const expectedStatus = 400;
            const expectedMessage = "Error!";

            service.acceptOffer(offerId, contractAddress).subscribe({
                next: _ => fail("should execute error callback"),
                error: (response: HttpErrorResponse) => {
                    expect(response.status).toEqual(expectedStatus);
                    expect(response.error).toEqual(expectedMessage);
                }
            });

            const testRequest = httpController.expectOne(`${ITEMS_API_URL}/${offerId}/accept`);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toEqual({contractAddress});
            testRequest.flush(expectedMessage, {status: expectedStatus, statusText: "Error!"});
        }));
    });

    describe("declineOffer()", () => {
        const offerId = 10;
        const mockConversationResponse: ConversationResponse = {
            id: 10,
            item: {
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
            interestedUser: {
                id: 11,
                ethereumAddress: null,
                username: "interested"
            },
            messages: [
                {
                    id: 11,
                    sendingUser: {
                        id: 11,
                        ethereumAddress: null,
                        username: "interested"
                    },
                    sentOn: Date.now().toLocaleString(),
                    textContent: "message 1",
                    offer: null
                },
                {
                    id: 12,
                    sendingUser: {
                        id: 10,
                        ethereumAddress: null,
                        username: "owner"
                    },
                    sentOn: Date.now().toString(),
                    textContent: "message 2",
                    offer: null
                }
            ]
        };
        const expectedApiUrl = `${ITEMS_API_URL}/${offerId}/decline`;

        it("should return a conversation", fakeAsync(() => {
            const expectedConversation = new Conversation(mockConversationResponse);

            service.declineOffer(offerId).subscribe(conversation => {
                expect(conversation.equals(expectedConversation));
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush(mockConversationResponse);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.declineOffer(offerId).subscribe(_ => {
                fail("should execute error callback");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush({key: "value"});
        }));

        it("should return a HttpErrorResponse on error", fakeAsync(() => {
            const expectedStatus = 400;
            const expectedMessage = "Error!";

            service.declineOffer(offerId).subscribe({
                next: _ => fail("should execute error callback"),
                error: (response: HttpErrorResponse) => {
                    expect(response.status).toEqual(expectedStatus);
                    expect(response.error).toEqual(expectedMessage);
                }
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush(expectedMessage, {status: expectedStatus, statusText: "Error!"});
        }));
    });

    describe("cancelOffer()", () => {
        const offerId = 10;
        const mockConversationResponse: ConversationResponse = {
            id: 10,
            item: {
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
            interestedUser: {
                id: 11,
                ethereumAddress: null,
                username: "interested"
            },
            messages: [
                {
                    id: 11,
                    sendingUser: {
                        id: 11,
                        ethereumAddress: null,
                        username: "interested"
                    },
                    sentOn: Date.now().toLocaleString(),
                    textContent: "message 1",
                    offer: null
                },
                {
                    id: 12,
                    sendingUser: {
                        id: 10,
                        ethereumAddress: null,
                        username: "owner"
                    },
                    sentOn: Date.now().toString(),
                    textContent: "message 2",
                    offer: null
                }
            ]
        };
        const expectedApiUrl = `${ITEMS_API_URL}/${offerId}/cancel`;

        it("should return a conversation", fakeAsync(() => {
            const expectedConversation = new Conversation(mockConversationResponse);

            service.cancelOffer(offerId).subscribe(conversation => {
                expect(conversation.equals(expectedConversation));
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush(mockConversationResponse);
        }));

        it("should throw an error when presented with a malformed response", fakeAsync(() => {
            service.cancelOffer(offerId).subscribe(_ => {
                fail("should execute error callback");
            }, error => {
                expect(error).toBeDefined();
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush({key: "value"});
        }));

        it("should return a HttpErrorResponse on error", fakeAsync(() => {
            const expectedStatus = 400;
            const expectedMessage = "Error!";

            service.cancelOffer(offerId).subscribe({
                next: _ => fail("should execute error callback"),
                error: (response: HttpErrorResponse) => {
                    expect(response.status).toEqual(expectedStatus);
                    expect(response.error).toEqual(expectedMessage);
                }
            });

            const testRequest = httpController.expectOne(expectedApiUrl);
            expect(testRequest.request.method).toEqual("PUT");
            expect(testRequest.request.body).toBeNull();
            testRequest.flush(expectedMessage, {status: expectedStatus, statusText: "Error!"});
        }));
    });
});
