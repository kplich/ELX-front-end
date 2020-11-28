import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ConversationComponent} from "@conversation/conversation/conversation.component";
import {Item} from "@items/data/Item";
import {of} from "rxjs";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {Conversation, ConversationResponse} from "@conversation/data/Conversation";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {Router, ActivatedRouteSnapshot} from "@angular/router";
import {OfferContractService} from "@shared/offer-contract/offer-contract.service";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ItemsService} from "@items/service/items.service";
import {ConversationService} from "@conversation/service/conversation/conversation.service";
import {SimpleUser} from "@my-account/data/SimpleUser";

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
const mockConversation: Conversation = new Conversation(mockConversationResponse);

const routerMock = jasmine.createSpyObj("router", {
    navigateByUrl: Promise.resolve()
});
const itemsServiceMock = jasmine.createSpyObj("itemsService", {
    getItem: of(new Item({
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
    }))
});
const conversationServiceMock = jasmine.createSpyObj("conversationService", {
    getConversation: of(mockConversation),
    getConversationWithSubject: of(mockConversation),
    sendMessage: of(mockConversation),
    sendMessageWithSubject: of(mockConversation),
    acceptOffer: of(mockConversation),
    declineOffer: of(mockConversation),
    cancelOffer: of(mockConversation)
});
const offerContractServiceMock = jasmine.createSpyObj("offerContractService", {
    createPlainAdvanceContract: {contract: "yes"},
    createDoubleAdvanceContract: {contract: "yes"}
});
const snackBarServiceMock = jasmine.createSpyObj("snackBar", ["openSnackBar"]);

function configureTestingModule(userMock: any, routeMock: any) {
    return TestBed.configureTestingModule({
        providers: [
            {provide: LoggedInUserService, useValue: userMock},
            {provide: Router, useValue: routerMock},
            {provide: ActivatedRouteSnapshot, useValue: routeMock},
            {provide: ItemsService, useValue: itemsServiceMock},
            {provide: ConversationService, useValue: conversationServiceMock},
            {provide: OfferContractService, useValue: offerContractServiceMock},
            {provide: SnackBarService, useValue: snackBarServiceMock}
        ],
        declarations: [ConversationComponent],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
}

function resetMockCalls() {
    routerMock.navigateByUrl.calls.reset();

    itemsServiceMock.getItem.calls.reset();

    conversationServiceMock.getConversation.calls.reset();
    conversationServiceMock.getConversationWithSubject.calls.reset();
    conversationServiceMock.sendMessage.calls.reset();
    conversationServiceMock.sendMessageWithSubject.calls.reset();
    conversationServiceMock.acceptOffer.calls.reset();
    conversationServiceMock.declineOffer.calls.reset();
    conversationServiceMock.cancelOffer.calls.reset();

    offerContractServiceMock.createPlainAdvanceContract.calls.reset();
    offerContractServiceMock.createDoubleAdvanceContract.calls.reset();

    snackBarServiceMock.openSnackBar.calls.reset();
}

fdescribe("ConversationComponent", () => {

    beforeEach(() => {
        resetMockCalls();
    });

    describe("when no user is logged in", () => {
        let component: ConversationComponent;
        let fixture: ComponentFixture<ConversationComponent>;

        const loggedInUserServiceMock = {
            authenticatedUser: null
        };

        beforeEach(async(() => {
            configureTestingModule(loggedInUserServiceMock, undefined).compileComponents();
        }));

        beforeEach(() => {
            resetMockCalls();
            fixture = TestBed.createComponent(ConversationComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it("should redirect to the log-in page", () => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/log-in");
        });
    });

    describe("when user is logged in", () => {
        let component: ConversationComponent;
        let fixture: ComponentFixture<ConversationComponent>;

        const loggedInUserServiceMock = {
            authenticatedUser: new SimpleUser({
                id: 10,
                ethereumAddress: null,
                username: "username"
            })
        };

        beforeEach(() => {
            resetMockCalls();
        });

        describe("and no item id has been provided in URL path", () => {
            const activatedRouteMock = {
                snapshot: {
                    paramMap: {get: () => null},
                    queryParamMap: {get: () => null}
                }
            };

            beforeEach(async(() => {
                configureTestingModule(loggedInUserServiceMock, activatedRouteMock).compileComponents();
            }));

            beforeEach(() => {
                resetMockCalls();
                fixture = TestBed.createComponent(ConversationComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });

            it("should redirect to error page", () => {
                expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/error");
            });
        });

        describe("and wrong item id has been provided in URL path params", () => {
            const activatedRouteMock = {
                snapshot: {
                    paramMap: {get: () => "not a param"},
                    queryParamMap: {get: () => null}
                }
            };

            beforeEach(async(() => {
                configureTestingModule(loggedInUserServiceMock, activatedRouteMock).compileComponents();
            }));

            beforeEach(() => {
                resetMockCalls();
                fixture = TestBed.createComponent(ConversationComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });

            it("should redirect to error page", () => {
                expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/error");
            });
        });

        describe("and wrong user id has been provided in URL query params", () => {
            const activatedRouteMock = {
                snapshot: {
                    paramMap: {get: () => "10"},
                    queryParamMap: {get: () => "not a param"}
                }
            };

            beforeEach(async(() => {
                configureTestingModule(loggedInUserServiceMock, activatedRouteMock).compileComponents();
            }));

            beforeEach(() => {
                resetMockCalls();
                fixture = TestBed.createComponent(ConversationComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });

            it("should redirect to error page", () => {
                expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/error");
            });
        });

        describe("and no user id has been provided in URL query params", () => {
            const itemId = 10;
            const activatedRouteMock = {
                snapshot: {
                    paramMap: {get: () => itemId.toString()},
                    queryParamMap: {get: () => null}
                }
            };

            beforeEach(async(() => {
                configureTestingModule(loggedInUserServiceMock, activatedRouteMock).compileComponents();
            }));

            beforeEach(() => {
                resetMockCalls();
                fixture = TestBed.createComponent(ConversationComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });

            it("should not redirect to error page", () => {
                expect(routerMock.navigateByUrl).not.toHaveBeenCalledWith("/error");
            });

            it("should not fetch conversation with a specific user", () => {
                expect(conversationServiceMock.getConversationWithSubject).not.toHaveBeenCalled();
                expect(conversationServiceMock.getConversation).toHaveBeenCalledWith(itemId);
            });

            describe("sendMessage()", () => {

            });
        });

        describe("and correct user id has been provided in URL query params", () => {
            const itemId = 10;
            const interestedUserId = 11;
            const activatedRouteMock = {
                snapshot: {
                    paramMap: {get: () => itemId.toString()},
                    queryParamMap: {get: () => interestedUserId.toString()}
                }
            };

            beforeEach(async(() => {
                configureTestingModule(loggedInUserServiceMock, activatedRouteMock).compileComponents();
            }));

            beforeEach(() => {
                resetMockCalls();
                fixture = TestBed.createComponent(ConversationComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });

            it("should not redirect to error page", () => {
                expect(routerMock.navigateByUrl).not.toHaveBeenCalledWith("/error");
            });

            it("should fetch a conversation with a specific user", () => {
                expect(conversationServiceMock.getConversation).not.toHaveBeenCalled();
                expect(conversationServiceMock.getConversationWithSubject)
                    .toHaveBeenCalledWith(itemId, interestedUserId);
            });
        });
    });
});
