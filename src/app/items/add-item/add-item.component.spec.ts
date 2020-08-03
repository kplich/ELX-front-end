import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddItemComponent} from './add-item.component';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ItemsService} from '../items-service/items.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatSelectHarness} from '@angular/material/select/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {SharedModule} from '../../shared/shared.module';
import {Observable} from 'rxjs';


describe('AddItemComponent', () => {
    const itemsServiceSpy = jasmine.createSpyObj(
        'ItemsService',
        ['addNewItem', 'getCategories']
    );
    itemsServiceSpy.getCategories.and.returnValue(new Observable(subscriber => {
        subscriber.next([{id: 1, name: 'Category 1'}, {id: 2, name: 'Category 2'}]);
    }));
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', [
        'openSnackBar',
    ]);

    let fixture: ComponentFixture<AddItemComponent>;
    let component: AddItemComponent;
    let loader: HarnessLoader;

    // This object's properties return functions so that they're lazily evaluated.
    const harnesses = {
        titleFormField: () => {
            return loader.getHarness(MatFormFieldHarness.with({selector: '#title-form-field'}));
        },
        titleInput: () => {
            return loader.getHarness(MatInputHarness.with({selector: '#title-form-field input'}));
        },
        priceFormField: () => {
            return loader.getHarness(MatFormFieldHarness.with({selector: '#price-form-field'}));
        },
        priceInput: () => {
            return loader.getHarness(MatInputHarness.with({selector: '#price-form-field input'}));
        },
        usedStatusFormField: () => {
            return loader.getHarness(MatFormFieldHarness.with({selector: '#status-form-field'}));
        },
        usedStatusSelect: () => {
            return loader.getHarness(MatSelectHarness.with({selector: '#status-form-field mat-select'}));
        },
        categoryFormField: () => {
            return loader.getHarness(MatFormFieldHarness.with({selector: '#category-form-field'}));
        },
        categorySelect: () => {
            return loader.getHarness(MatSelectHarness.with({selector: '#category-form-field mat-select'}));
        },
        descriptionFormField: () => {
            return loader
                .getHarness(MatFormFieldHarness.with({selector: '#description-form-field'}));
        },
        descriptionInput: () => {
            return loader
                .getHarness(MatInputHarness.with({selector: '#description-form-field input'}));
        },
        photoUploaderComponent: () => {
            return fixture.nativeElement.querySelector('app-photo-uploader');
        },
        addItemButton: () => {
            return loader
                .getHarness(MatButtonHarness.with({text: component.strings.buttonAddItem}));
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule, SharedModule],
            declarations: [AddItemComponent],
            providers: [
                {provide: ItemsService, useValue: itemsServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: SnackBarService, useValue: snackBarServiceSpy}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddItemComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should create the component and child components', async(async () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
        expect(await harnesses.titleFormField()).toBeTruthy();
        expect(await harnesses.priceFormField()).toBeTruthy();
        expect(await harnesses.usedStatusFormField()).toBeTruthy();
        expect(await harnesses.categoryFormField()).toBeTruthy();
        expect(await harnesses.descriptionFormField()).toBeTruthy();
        expect(harnesses.photoUploaderComponent()).toBeTruthy();
        expect(await harnesses.addItemButton()).toBeTruthy();

        expect(component.form.valid).toBeFalsy();
        expect(await (await harnesses.addItemButton()).isDisabled()).toBeTruthy();
    }));

    it('should not allow to add an item with invalid data', async(async () => {
        /*fixture.detectChanges();

        await (await harnesses.titleInput())
            .setValue('long enough value, but doesn\'t match the pattern!');

        const titleFormField = await harnesses.titleFormField();

        expect((await titleFormField.getTextErrors())[0])
            .toEqual(component.strings.title.illegalSymbols);*/
    }));
});
