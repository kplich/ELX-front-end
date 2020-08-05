import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemCardComponent} from './item-card.component';
import {By, DomSanitizer} from '@angular/platform-browser';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {Item} from '../../items-service/data/Item';
import {statusToDtoString, UsedStatus} from '../../items-service/data/UsedStatus';
import {formatDate} from '@angular/common';
import {DebugElement} from '@angular/core';
import {findByCss as _findByCss} from '../../../shared/FindByCss';

describe('ItemCardComponent', () => {
    const routerSpy = jasmine.createSpyObj('router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.returnValue(Promise.resolve());
    const domSanitizer = jasmine.createSpyObj('domSanitizer', ['bypassSecurityTrustUrl']);

    let component: ItemCardComponent;
    let fixture: ComponentFixture<ItemCardComponent>;

    let cardContainer: DebugElement;
    let title: HTMLDivElement;
    let status: HTMLDivElement;
    let addedBy: HTMLDivElement;
    let category: HTMLDivElement;
    let price: HTMLDivElement;

    const findByCss: <EL extends HTMLElement> (selector: string) => EL = (selector: string) => {
        return _findByCss(fixture, selector);
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MaterialModule, BrowserAnimationsModule, RouterTestingModule],
            declarations: [ItemCardComponent],
            providers: [
                {provide: Router, useValue: routerSpy},
                {provide: DomSanitizer, useValue: domSanitizer}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ItemCardComponent);
        component = fixture.componentInstance;

        cardContainer = fixture.debugElement.query(By.css('.simple-card'));
        title = findByCss('.item-card-details-title');
        status = undefined; // at the beginning, component isn't defined, so the status doesn't show
        addedBy = findByCss('.item-card-details-added-by');
        category = findByCss('.item-card-details-category');
        price = findByCss('.item-card-details-price');

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display correct data after item is loaded', () => {
        expect(component).toBeTruthy();
        expect(status).toBeUndefined();

        const item = new Item({
            id: 10,
            title: 'Item title',
            description: 'Item description',
            price: 5.567,
            addedBy: {
                id: 1,
                username: 'kplich'
            },
            addedOn: (new Date()).toISOString(),
            category: {
                id: 1,
                name: 'Category'
            },
            usedStatus: statusToDtoString(UsedStatus.NEW),
            photoUrls: [],
            closedOn: null
        });

        component.item = item;
        fixture.detectChanges();
        status = findByCss('.item-card-details-status');
        expect(status).toBeDefined();


        expect(title.textContent).toEqual(item.title);
        expect(status.textContent).toEqual(item.usedStatus);
        expect(addedBy.textContent.trim())
            .toEqual(`${component.strings.addedBy} ${item.addedBy.username} on ${formatDate(new Date(), 'mediumDate', 'en-US')}`);
        expect(category.textContent.trim())
            .toEqual(`${component.strings.category}: ${item.category.name}`);
        expect(price.textContent.trim())
            .toEqual(item.formattedPrice);
    });

    it('should not display status \'not applicable\'', () => {
        expect(component).toBeTruthy();
        expect(status).toBeUndefined();

        component.item = new Item({
            id: 10,
            title: 'Item title',
            description: 'Item description',
            price: 5.567,
            addedBy: {
                id: 1,
                username: 'kplich'
            },
            addedOn: (new Date()).toISOString(),
            category: {
                id: 1,
                name: 'Category'
            },
            usedStatus: statusToDtoString(UsedStatus.NOT_APPLICABLE),
            photoUrls: [],
            closedOn: null
        });
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.item-card-details-status'))).toBeNull();
    });

    it('should navigate to item when clicked', () => {
        expect(component).toBeTruthy();

        const itemId = 10;
        component.item = new Item({
            id: itemId,
            title: 'Item title',
            description: 'Item description',
            price: 5.567,
            addedBy: {
                id: 1,
                username: 'kplich'
            },
            addedOn: (new Date()).toISOString(),
            category: {
                id: 1,
                name: 'Category'
            },
            usedStatus: statusToDtoString(UsedStatus.NEW),
            photoUrls: [],
            closedOn: null
        });
        fixture.detectChanges();

        cardContainer.triggerEventHandler('click', null);
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/items/${itemId}`);
    });
});
