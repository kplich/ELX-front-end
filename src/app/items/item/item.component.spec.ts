import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemComponent} from "./item.component";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {Item} from "../data/Item";
import {statusToDtoString, UsedStatus} from "../data/UsedStatus";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemsService} from "../service/items.service";
import {AuthenticationService} from "../../authentication/authentication-service/authentication.service";
import {SnackBarService} from "../../shared/snack-bar-service/snack-bar.service";
import {DomSanitizer} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {MaterialModule} from "../../material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCarouselModule} from "@ngmodule/material-carousel";
import {formatDate} from "@angular/common";
import {findByCss} from "../../shared/FindByCss";

const fakeActivatedRoute = {
    snapshot: {
        paramMap: {
            get(_: string): string {
                return "10";
            }
        }
    }
};

const usualItem = new Item({
    id: 10,
    title: "Item title",
    description: "Item description",
    price: 5.567,
    addedBy: {
        id: 1,
        username: "kplich"
    },
    addedOn: (new Date()).toISOString(),
    category: {
        id: 1,
        name: "Category"
    },
    usedStatus: statusToDtoString(UsedStatus.NEW),
    photoUrls: [],
    closedOn: null
});

const closedItem = new Item({
    id: 10,
    title: "Item title",
    description: "Item description",
    price: 5.567,
    addedBy: {
        id: 1,
        username: "kplich"
    },
    addedOn: (new Date()).toISOString(),
    category: {
        id: 1,
        name: "Category"
    },
    usedStatus: statusToDtoString(UsedStatus.NEW),
    photoUrls: [],
    closedOn: (new Date()).toISOString()
});

const notApplicableStatusItem = new Item({
    id: 10,
    title: "Item title",
    description: "Item description",
    price: 5.567,
    addedBy: {
        id: 1,
        username: "kplich"
    },
    addedOn: (new Date()).toISOString(),
    category: {
        id: 1,
        name: "Category"
    },
    usedStatus: statusToDtoString(UsedStatus.NOT_APPLICABLE),
    photoUrls: [],
    closedOn: null
});

let title: HTMLSpanElement;
let price: HTMLSpanElement;
let status: HTMLDivElement;
let sendMessage: HTMLButtonElement;
let sendOffer: HTMLButtonElement;
let acceptOffer: HTMLButtonElement;
let editItem: HTMLButtonElement;
let closeOffer: HTMLButtonElement;
let category: HTMLDivElement;
let addedBy: HTMLDivElement;
let addedOn: HTMLDivElement;
let description: HTMLDivElement;

function findElements(fixture: ComponentFixture<ItemComponent>) {
    title = findByCss(fixture, "#item-title");
    price = findByCss(fixture, "#item-price");
    status = findByCss(fixture, "#item-status");
    category = findByCss(fixture, "#item-category");
    sendMessage = findByCss(fixture, "#item-send-message");
    sendOffer = findByCss(fixture, "#item-send-offer");
    acceptOffer = findByCss(fixture, "#item-accept-offer");
    editItem = findByCss(fixture, "#item-edit-item");
    closeOffer = findByCss(fixture, "#item-close-offer");
    addedBy = findByCss(fixture, "#item-added-by");
    addedOn = findByCss(fixture, "#item-added-on");
    description = findByCss(fixture, "#item-description");
}

describe("ItemComponent with no logged in user, open item and applicable status", () => {

    const domSanitizerSpy = jasmine.createSpyObj("domSanitizer", ["bypassSecurityTrustUrl"]);
    const routerSpy = jasmine.createSpyObj("router", ["navigateByUrl"]);
    const snackBarServiceSpy = jasmine.createSpyObj("snackBarService", ["openSnackBar"]);
    const itemsServiceSpy = jasmine.createSpyObj("itemsService", ["getItem"]);
    itemsServiceSpy.getItem.and
        .returnValue(new Observable(subscriber => subscriber.next({body: usualItem})));
    const authenticationServiceSpy = jasmine.createSpyObj("authenticationService", ["any"]);

    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;
    let loader: HarnessLoader;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MatCarouselModule
            ],
            declarations: [ItemComponent],
            providers: [
                {provide: ItemsService, useValue: itemsServiceSpy},
                {provide: AuthenticationService, useValue: authenticationServiceSpy},
                {provide: ActivatedRoute, useValue: fakeActivatedRoute},
                {provide: SnackBarService, useValue: snackBarServiceSpy},
                {provide: DomSanitizer, useValue: domSanitizerSpy},
                {provide: Router, useValue: routerSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;

        fixture.detectChanges();

        findElements(fixture);
    });

    it("should display correct data", () => {
        expect(component).toBeTruthy();

        expect(component.loggedInUserIsOwner).toBeFalsy();
        expect(itemsServiceSpy.getItem).toHaveBeenCalledWith(usualItem.id);
        expect(component.item).toEqual(usualItem);

        expect(title.textContent.trim()).toEqual(usualItem.title);
        expect(price.textContent.trim()).toEqual(usualItem.formattedPrice);
        expect(status.textContent.trim()).toEqual(usualItem.usedStatus);
        expect(category.textContent.trim()).toEqual(
            `${component.strings.category}: ${usualItem.category.name}`
        );
        expect(sendMessage).toBeDefined();
        expect(sendOffer).toBeDefined();
        expect(acceptOffer).toBeDefined();
        expect(editItem).toBeUndefined();
        expect(closeOffer).toBeUndefined();
        expect(addedBy.textContent.trim()).toEqual(
            `${component.strings.addedBy} ${usualItem.addedBy.username}`
        );
        expect(addedOn.textContent.trim()).toEqual(
            `${component.strings.addedOn} ${formatDate(new Date(), "mediumDate", "en-US")}`
        );
        expect(description.textContent.trim()).toEqual(usualItem.description);
    });
});

describe("ItemComponent with no logged in user, closed item and applicable status", () => {

    const domSanitizerSpy = jasmine.createSpyObj("domSanitizer", ["bypassSecurityTrustUrl"]);
    const routerSpy = jasmine.createSpyObj("router", ["navigateByUrl"]);
    const snackBarServiceSpy = jasmine.createSpyObj("snackBarService", ["openSnackBar"]);
    const itemsServiceSpy = jasmine.createSpyObj("itemsService", ["getItem"]);
    itemsServiceSpy.getItem.and
        .returnValue(new Observable(subscriber => subscriber.next({body: closedItem})));
    const authenticationServiceSpy = jasmine.createSpyObj("authenticationService", ["any"]);

    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;
    let loader: HarnessLoader;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MatCarouselModule
            ],
            declarations: [ItemComponent],
            providers: [
                {provide: ItemsService, useValue: itemsServiceSpy},
                {provide: AuthenticationService, useValue: authenticationServiceSpy},
                {provide: ActivatedRoute, useValue: fakeActivatedRoute},
                {provide: SnackBarService, useValue: snackBarServiceSpy},
                {provide: DomSanitizer, useValue: domSanitizerSpy},
                {provide: Router, useValue: routerSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;

        fixture.detectChanges();

        findElements(fixture);
    });

    it("should display closed item correctly", async () => {
        expect(component).toBeTruthy();

        const itemClosed = findByCss(fixture, "#item-closed") as HTMLDivElement;
        expect(itemClosed.textContent.trim()).toEqual(
            `${component.strings.itemClosed} ${formatDate(new Date(), "mediumDate", "en-US")}`
        );
        expect(sendMessage).toBeUndefined();
        expect(sendOffer).toBeUndefined();
        expect(acceptOffer).toBeUndefined();
        expect(editItem).toBeUndefined();
        expect(closeOffer).toBeUndefined();
    });
});

describe("ItemComponent with no logged in user, open item and not-applicable status", () => {

    const domSanitizerSpy = jasmine.createSpyObj("domSanitizer", ["bypassSecurityTrustUrl"]);
    const routerSpy = jasmine.createSpyObj("router", ["navigateByUrl"]);
    const snackBarServiceSpy = jasmine.createSpyObj("snackBarService", ["openSnackBar"]);
    const itemsServiceSpy = jasmine.createSpyObj("itemsService", ["getItem"]);
    itemsServiceSpy.getItem.and.returnValue(new Observable(subscriber => {
        subscriber.next({body: notApplicableStatusItem});
    }));
    const authenticationServiceSpy = jasmine.createSpyObj("authenticationService", ["any"]);

    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;
    let loader: HarnessLoader;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MatCarouselModule
            ],
            declarations: [ItemComponent],
            providers: [
                {provide: ItemsService, useValue: itemsServiceSpy},
                {provide: AuthenticationService, useValue: authenticationServiceSpy},
                {provide: ActivatedRoute, useValue: fakeActivatedRoute},
                {provide: SnackBarService, useValue: snackBarServiceSpy},
                {provide: DomSanitizer, useValue: domSanitizerSpy},
                {provide: Router, useValue: routerSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;

        fixture.detectChanges();

        findElements(fixture);
    });

    it("should display item with status 'not applicable' correctly", () => {
        expect(component).toBeTruthy();

        // required because status has been initialized previously with incorrect data
        status = findByCss(fixture, "#item-status");
        expect(status).toBeUndefined();
    });
});

describe("ItemComponent with logged in user, open item and applicable status", () => {

    const domSanitizerSpy = jasmine.createSpyObj("domSanitizer", ["bypassSecurityTrustUrl"]);
    const routerSpy = jasmine.createSpyObj("router", ["navigateByUrl"]);
    const snackBarServiceSpy = jasmine.createSpyObj("snackBarService", ["openSnackBar"]);
    const itemsServiceSpy = jasmine.createSpyObj("itemsService", ["getItem"]);
    itemsServiceSpy.getItem.and.returnValue(new Observable(subscriber => {
        subscriber.next({body: usualItem});
    }));
    const fakeAuthenticationService = {
        authenticatedUser: "kplich"
    };

    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;
    let loader: HarnessLoader;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MatCarouselModule
            ],
            declarations: [ItemComponent],
            providers: [
                {provide: ItemsService, useValue: itemsServiceSpy},
                {provide: AuthenticationService, useValue: fakeAuthenticationService},
                {provide: ActivatedRoute, useValue: fakeActivatedRoute},
                {provide: SnackBarService, useValue: snackBarServiceSpy},
                {provide: DomSanitizer, useValue: domSanitizerSpy},
                {provide: Router, useValue: routerSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;

        fixture.detectChanges();

        findElements(fixture);
    });

    it("should display item and applicable actions correctly", () => {
        expect(component).toBeTruthy();

        expect(component.loggedInUserIsOwner).toBeTruthy();
        expect(itemsServiceSpy.getItem).toHaveBeenCalledWith(usualItem.id);
        expect(component.item).toEqual(usualItem);

        expect(title.textContent.trim()).toEqual(usualItem.title);
        expect(price.textContent.trim()).toEqual(usualItem.formattedPrice);
        expect(status.textContent.trim()).toEqual(usualItem.usedStatus);
        expect(category.textContent.trim()).toEqual(
            `${component.strings.category}: ${usualItem.category.name}`
        );
        expect(sendMessage).toBeUndefined();
        expect(sendOffer).toBeUndefined();
        expect(acceptOffer).toBeUndefined();
        expect(editItem).toBeDefined();
        expect(closeOffer).toBeDefined();
        expect(addedBy.textContent.trim()).toEqual(
            `${component.strings.addedBy} ${usualItem.addedBy.username}`
        );
        expect(addedOn.textContent.trim()).toEqual(
            `${component.strings.addedOn} ${formatDate(new Date(), "mediumDate", "en-US")}`
        );
        expect(description.textContent.trim()).toEqual(usualItem.description);
    });
});
