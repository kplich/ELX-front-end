import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemComponent, STRINGS} from "@items/item/item.component";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {ItemsService} from "@items/service/items.service";
import {Item} from "@items/data/Item";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {of, throwError} from "rxjs";

describe("ItemComponent", () => {
    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;
    let loader: HarnessLoader;

    const loggedInUserMock = {
        authenticatedUser: null
    };

    let routeItemId: string | null = null;
    const routeMock = {
        snapshot: {
            paramMap: {
                get: (key: string) => {
                    return routeItemId;
                }
            }
        }
    };

    const routerMock = jasmine.createSpyObj("router", {
        navigateByUrl: Promise.resolve()
    });
    const snackBarMock = jasmine.createSpyObj("snackbar", {
        openSnackBar: undefined
    });
    const itemsServiceMock = jasmine.createSpyObj("itemsService", ["getItem", "closeItem"]);

    function configureTestingModule() {
        TestBed.configureTestingModule({
            declarations: [ItemComponent],
            providers: [
                {provide: LoggedInUserService, useValue: loggedInUserMock},
                {provide: ActivatedRoute, useValue: routeMock},
                {provide: Router, useValue: routerMock},
                {provide: SnackBarService, useValue: snackBarMock},
                {provide: ItemsService, useValue: itemsServiceMock}
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }

    beforeEach(() => {
        routerMock.navigateByUrl.calls.reset();
        snackBarMock.openSnackBar.calls.reset();
    });

    describe("when item id is not provided", () => {
        beforeEach(async(() => {
            routeItemId = null;

            configureTestingModule();

            fixture = TestBed.createComponent(ItemComponent);
            loader = TestbedHarnessEnvironment.loader(fixture);
            component = fixture.componentInstance;

            fixture.detectChanges();
        }));

        it("redirects to error", () => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/error");
        });

        it("displays a snack bar", async(() => {
            expect(snackBarMock.openSnackBar).toHaveBeenCalledWith(STRINGS.messages.couldNotLoadItem);
        }));
    });

    describe("when item id is not a number", () => {
        beforeEach(async(() => {
            routeItemId = "not a number";

            configureTestingModule();

            fixture = TestBed.createComponent(ItemComponent);
            loader = TestbedHarnessEnvironment.loader(fixture);
            component = fixture.componentInstance;

            fixture.detectChanges();
        }));

        it("redirects to error", () => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/error");
        });

        it("displays a snack bar", async(() => {
            expect(snackBarMock.openSnackBar).toHaveBeenCalledWith(STRINGS.messages.couldNotLoadItem);
        }));
    });

    describe("when item id is given", () => {

        const itemId = 10;
        beforeEach(async(() => {
            routeItemId = itemId.toString();
            itemsServiceMock.getItem.and.returnValue(jasmine.createSpyObj("item", ["pipe"]));

            configureTestingModule();

            fixture = TestBed.createComponent(ItemComponent);
            loader = TestbedHarnessEnvironment.loader(fixture);
            component = fixture.componentInstance;

            fixture.detectChanges();
        }));

        it("should not redirect", () => {
            expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
        });

        it("should call getItem in the itemService", () => {
            expect(itemsServiceMock.getItem).toHaveBeenCalledWith(itemId);
        });
    });
});

describe("ItemComponent getItem()", () => {
    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;
    let loader: HarnessLoader;

    const loggedInUserMock = {
        authenticatedUser: null
    };

    const itemId = 10;
    const routeMock = {
        snapshot: {
            paramMap: {
                get: (key: string) => {
                    return itemId.toString();
                }
            }
        }
    };
    const routerMock = jasmine.createSpyObj("router", {
        navigateByUrl: Promise.resolve()
    });
    const snackBarMock = jasmine.createSpyObj("snackbar", {
        openSnackBar: undefined
    });
    const itemsServiceMock = jasmine.createSpyObj("itemsService", ["getItem", "closeItem"]);

    function configureTestingModule() {
        TestBed.configureTestingModule({
            declarations: [ItemComponent],
            providers: [
                {provide: LoggedInUserService, useValue: loggedInUserMock},
                {provide: ActivatedRoute, useValue: routeMock},
                {provide: Router, useValue: routerMock},
                {provide: SnackBarService, useValue: snackBarMock},
                {provide: ItemsService, useValue: itemsServiceMock}
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }

    beforeEach(async(() => {
        configureTestingModule();

        fixture = TestBed.createComponent(ItemComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;

        routerMock.navigateByUrl.calls.reset();
        snackBarMock.openSnackBar.calls.reset();
    }));

    it("redirects to not found when service returns 404", () => {
        itemsServiceMock.getItem.and.returnValue(throwError({status: 404}));

        fixture.detectChanges();

        expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/not-found");
    });

    it("redirects to error when service returns other error", () => {
        itemsServiceMock.getItem.and.returnValue(throwError({status: 500}));

        fixture.detectChanges();

        expect(routerMock.navigateByUrl).toHaveBeenCalledWith("/error");
    });

    it("displays an item", async(() => {
        const expectedNewItem = new Item({
            id: 100,
            title: "Item  found!",
            description: "",
            price: 0,
            addedBy: {
                id: 0,
                ethereumAddress: null,
                username: "notauser"
            },
            addedOn: Date.now().toLocaleString(),
            category: {
                id: 0,
                name: "Not a category"
            },
            usedStatus: UsedStatusDto.NOT_APPLICABLE,
            photoUrls: ["https://http.cat/200"],
            closedOn: null
        });
        itemsServiceMock.getItem.and.returnValue(of(expectedNewItem));

        fixture.detectChanges();

        component.item$.subscribe(item => {
            expect(item.equals(expectedNewItem)).toBeTruthy();
        });
    }));
});

describe("ItemComponent closeItem()", () => {
    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;
    let loader: HarnessLoader;

    const loggedInUserMock = {
        authenticatedUser: null
    };

    const itemId = 10;
    const routeMock = {
        snapshot: {
            paramMap: {
                get: (key: string) => {
                    return itemId.toString();
                }
            }
        }
    };
    const routerMock = jasmine.createSpyObj("router", {
        navigateByUrl: Promise.resolve()
    });
    const snackBarMock = jasmine.createSpyObj("snackbar", {
        openSnackBar: undefined
    });
    const itemsServiceMock = jasmine.createSpyObj("itemsService", ["getItem", "closeItem"]);

    function configureTestingModule() {
        TestBed.configureTestingModule({
            declarations: [ItemComponent],
            providers: [
                {provide: LoggedInUserService, useValue: loggedInUserMock},
                {provide: ActivatedRoute, useValue: routeMock},
                {provide: Router, useValue: routerMock},
                {provide: SnackBarService, useValue: snackBarMock},
                {provide: ItemsService, useValue: itemsServiceMock}
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }

    beforeEach(async(() => {
        configureTestingModule();

        fixture = TestBed.createComponent(ItemComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;

        snackBarMock.openSnackBar.calls.reset();

        itemsServiceMock.getItem.and.returnValue(jasmine.createSpyObj("item", ["pipe"]));
        itemsServiceMock.closeItem.calls.reset();
    }));

    it("executes the method in the item service", () => {
        itemsServiceMock.closeItem.and.returnValue(jasmine.createSpyObj("item", ["pipe"]));
        fixture.detectChanges();

        component.closeItem(itemId);

        expect(itemsServiceMock.closeItem).toHaveBeenCalledWith(itemId);
    });

    it("returns an item when the service returns correctly", async(() => {
        const expectedNewItem = new Item({
            id: itemId,
            title: "Item found!",
            description: "",
            price: 0,
            addedBy: {
                id: 0,
                ethereumAddress: null,
                username: "notauser"
            },
            addedOn: Date.now().toLocaleString(),
            category: {
                id: 0,
                name: "Not a category"
            },
            usedStatus: UsedStatusDto.NOT_APPLICABLE,
            photoUrls: ["https://http.cat/200"],
            closedOn: null
        });
        itemsServiceMock.closeItem.and.returnValue(of(expectedNewItem));
        fixture.detectChanges();

        component.closeItem(itemId);

        component.item$.subscribe(item => {
            expect(item.equals(expectedNewItem)).toBeTruthy();
        });
    }));

    it("shows a snack bar when the service throws an error", () => {
        pending("error is not caught");
        itemsServiceMock.closeItem.and.returnValue(throwError({status: 500}));
        fixture.detectChanges();

        component.closeItem(itemId);

        expect(snackBarMock.openSnackBar).toHaveBeenCalled();
    });
});
