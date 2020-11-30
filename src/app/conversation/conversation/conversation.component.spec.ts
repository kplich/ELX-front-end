import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ConversationComponent} from "@conversation/conversation/conversation.component";
import {Item} from "@items/data/Item";
import {of} from "rxjs";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {Conversation, ConversationResponse} from "@conversation/data/Conversation";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {Router, ActivatedRoute} from "@angular/router";
import {OfferContractService} from "@shared/offer-contract/offer-contract.service";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ItemsService} from "@items/service/items.service";
import {ConversationService} from "@conversation/service/conversation/conversation.service";
import {SimpleUser} from "@my-account/data/SimpleUser";

describe("ConversationComponent", () => {
    let component: ConversationComponent;
    let fixture: ComponentFixture<ConversationComponent>;

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

    describe("ngOnInit", () => {
        let routeItemId: string | null = null;
        let routeUserId: string | null = null;
        const routeMock = {
            snapshot: {
                paramMap: {
                    get: (key: string) => {
                        return routeItemId;
                    }
                },
                queryParamMap: {
                    get: (key: string) => {
                        return routeUserId;
                    }
                }
            }
        };

        let userMock: {authenticatedUser: SimpleUser | null};

        function configureTestingModule() {
            return TestBed.configureTestingModule({
                providers: [
                    {provide: LoggedInUserService, useValue: userMock},
                    {provide: Router, useValue: routerMock},
                    {provide: ActivatedRoute, useValue: routeMock},
                    {provide: ItemsService, useValue: itemsServiceMock},
                    {provide: ConversationService, useValue: conversationServiceMock},
                    {provide: OfferContractService, useValue: offerContractServiceMock},
                    {provide: SnackBarService, useValue: snackBarServiceMock}
                ],
                declarations: [ConversationComponent],
                schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        }

        beforeEach(() => {
            routerMock.navigateByUrl.calls.reset();
        });

        describe("when no user is logged in", () => {
            beforeEach(async(() => {
                userMock = {
                    authenticatedUser: null
                };

                configureTestingModule();
                fixture = TestBed.createComponent(ConversationComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
            }));

            it("should redirect to the log-in page", () => {
                expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/log-in");
            });
        });

        describe("when user is logged in", () => {

            beforeEach(() => {
                userMock = {
                    authenticatedUser: new SimpleUser({
                        id: 10,
                        ethereumAddress: null,
                        username: "username"
                    })
                };
                routerMock.navigateByUrl.calls.reset();
                conversationServiceMock.getConversationWithSubject.calls.reset();
                conversationServiceMock.getConversation.calls.reset();
            });

            describe("and no item id has been provided in URL path", () => {
                beforeEach(async(() => {
                    routeItemId = null;
                    routeUserId = null;

                    configureTestingModule();
                    fixture = TestBed.createComponent(ConversationComponent);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                }));

                it("should redirect to error page", () => {
                    expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/error");
                });
            });

            describe("and wrong item id has been provided in URL path params", () => {
                beforeEach(async(() => {
                    routeItemId = "not a number";
                    routeUserId = null;

                    configureTestingModule();
                    fixture = TestBed.createComponent(ConversationComponent);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                }));

                it("should redirect to error page", () => {
                    expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/error");
                });
            });

            describe("and wrong user id has been provided in URL query params", () => {
                beforeEach(async(() => {
                    const itemId = 10;
                    routeItemId = itemId.toString();
                    routeUserId = "not a number";

                    configureTestingModule();
                    fixture = TestBed.createComponent(ConversationComponent);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                }));

                it("should redirect to error page", () => {
                    expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/error");
                });
            });

            describe("and no user id has been provided in URL query params", () => {
                const itemId = 10;

                beforeEach(async(() => {
                    routeItemId = itemId.toString();
                    routeUserId = null;

                    configureTestingModule();
                    fixture = TestBed.createComponent(ConversationComponent);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                }));

                it("should not redirect to error page", () => {
                    expect(routerMock.navigateByUrl).not.toHaveBeenCalledWith("/error");
                });

                it("should not fetch conversation with a specific user", () => {
                    expect(conversationServiceMock.getConversationWithSubject).not.toHaveBeenCalled();
                    expect(conversationServiceMock.getConversation).toHaveBeenCalledWith(itemId);
                });
            });

            describe("and correct user id has been provided in URL query params", () => {
                const itemId = 10;
                const interestedUserId = 11;

                beforeEach(async(() => {
                    routeItemId = itemId.toString();
                    routeUserId = interestedUserId.toString();

                    configureTestingModule();
                    fixture = TestBed.createComponent(ConversationComponent);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                }));

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
});
