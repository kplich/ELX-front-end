import {async, TestBed} from '@angular/core/testing';

import {AddItemComponent} from './add-item.component';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ItemsService} from '../items-service/items.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('AddItemComponent', () => {
    const itemsServiceSpy = jasmine.createSpyObj(
        'ItemsService',
        ['addNewItem']
    );
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', [
        'openSnackBar',
    ]);


    let component: AddItemComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
            declarations: [AddItemComponent],
            providers: [
                {provide: ItemsService, useValue: itemsServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: SnackBarService, useValue: snackBarServiceSpy}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        const fixture = TestBed.createComponent(AddItemComponent);
        const loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
