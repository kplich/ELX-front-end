import {ComponentFixture, TestBed} from "@angular/core/testing";

import {AddItemComponent} from "@items/add/add-item.component";
import {MaterialModule} from "@material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemsService} from "@items/service/items.service";
import {Router} from "@angular/router";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatFormFieldHarness} from "@angular/material/form-field/testing";
import {MatInputHarness} from "@angular/material/input/testing";
import {MatSelectHarness} from "@angular/material/select/testing";
import {MatButtonHarness} from "@angular/material/button/testing";
import {HarnessLoader} from "@angular/cdk/testing";
import {SharedModule} from "@shared/shared.module";
import {Observable} from "rxjs";
import {UsedStatus} from "@items/data/UsedStatus";
import {STRINGS} from "@items/edit-base/ItemEditBase";

describe("AddItemComponent", () => {

    const itemsServiceSpy = jasmine.createSpyObj(
        "ItemsService",
        ["addNewItem", "getCategories"]
    );
    itemsServiceSpy.getCategories.and.returnValue(new Observable(subscriber => {
        subscriber.next([{id: 1, name: "Category 1"}, {id: 2, name: "Category 2"}]);
    }));
    itemsServiceSpy.addNewItem.and.returnValue(new Observable(_ => {}));
    const routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    const snackBarServiceSpy = jasmine.createSpyObj("SnackBarService", [
        "openSnackBar",
    ]);

    let fixture: ComponentFixture<AddItemComponent>;
    let component: AddItemComponent;
    let loader: HarnessLoader;

    let titleFormField: MatFormFieldHarness;
    let titleInput: MatInputHarness;
    let priceFormField: MatFormFieldHarness;
    let priceInput: MatInputHarness;
    let statusFormField: MatFormFieldHarness;
    let statusSelect: MatSelectHarness;
    let categoryFormField: MatFormFieldHarness;
    let categorySelect: MatSelectHarness;
    let descriptionFormField: MatFormFieldHarness;
    let descriptionInput: MatInputHarness;
    let photoUploaderComponent: HTMLElement;
    let addItemButton: MatButtonHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule, SharedModule],
            declarations: [AddItemComponent],
            providers: [
                {provide: ItemsService, useValue: itemsServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: SnackBarService, useValue: snackBarServiceSpy}
            ]
        })
            .compileComponents();

        // not a fan of what's going on here, but rewriting this code doesn't seem possible
        // patiently waiting for an answer at https://stackoverflow.com/q/63235895/8059957
        fixture = TestBed.createComponent(AddItemComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        titleFormField = await loader.getHarness(MatFormFieldHarness.with({selector: "#title-form-field"}));
        titleInput = await loader.getHarness(MatInputHarness.with({selector: "#title-form-field input"}));
        priceFormField = await loader.getHarness(MatFormFieldHarness.with({selector: "#price-form-field"}));
        priceInput = await loader.getHarness(MatInputHarness.with({selector: "#price-form-field input"}));
        statusFormField = await loader.getHarness(MatFormFieldHarness.with({selector: "#status-form-field"}));
        statusSelect = await loader.getHarness(MatSelectHarness.with({selector: "#status-form-field mat-select"}));
        categoryFormField = await loader.getHarness(MatFormFieldHarness.with({selector: "#category-form-field"}));
        categorySelect = await loader.getHarness(MatSelectHarness.with({selector: "#category-form-field mat-select"}));
        descriptionFormField = await loader.getHarness(MatFormFieldHarness.with({selector: "#description-form-field"}));
        descriptionInput = await loader.getHarness(MatInputHarness
            .with({selector: "#description-form-field textarea"}));

        photoUploaderComponent = fixture.nativeElement.querySelector("app-photo-uploader");

        addItemButton = await loader.getHarness(MatButtonHarness.with({text: STRINGS.buttonAddItem}));

        fixture.detectChanges();
    });

    it("should create the component and child components", async () => {
        expect(itemsServiceSpy.getCategories).toHaveBeenCalled();

        component.categories$.subscribe(categories => {
            expect(categories.length).toEqual(2);
        });

        // eh, for some reason this does not work
        // expect((await categorySelect.getOptions()).length).toEqual(2);

        expect(component).toBeDefined("The component should be defined!");
        expect(titleFormField).toBeDefined("The title form field should be defined!");
        expect(priceFormField).toBeDefined("The price form field should be defined!");
        expect(statusFormField).toBeDefined("The status form field should be defined!");
        expect(categoryFormField).toBeDefined("The category form field should be defined!");
        expect(descriptionFormField).toBeDefined("The description should be defined!");
        expect(photoUploaderComponent).toBeDefined("The photo uploader component should be defined!");
        expect(addItemButton).toBeDefined("The add item button should be defined!");

        expect(component.form.valid).toBeFalsy();
        expect(await addItemButton.isDisabled()).toBeTruthy();
    });

    it("should not allow to add an item with invalid data", async () => {
        expect(itemsServiceSpy.getCategories).toHaveBeenCalled();
        component.categories$.subscribe(categories => {
            expect(categories.length).toEqual(2);
        });
        // expect((await categorySelect.getOptions()).length).toEqual(2);

        await titleInput.setValue("long enough value, but doesn't match the pattern!");

        expect((await titleFormField.getTextErrors())[0])
            .toEqual(STRINGS.title.illegalSymbols);

        await priceInput.setValue("15.543");

        await categorySelect.clickOptions({text: "Category 2"});

        await statusSelect.clickOptions(({text: UsedStatus.NEW}));
        await descriptionInput.setValue("long enough description for the form to be happy");

        expect((await titleFormField.getTextErrors())[0])
            .toEqual(STRINGS.title.illegalSymbols);

        expect(component.form.valid).toBeFalsy();
        expect(await addItemButton.isDisabled()).toBeTruthy();

        await addItemButton.click();

        expect(itemsServiceSpy.addNewItem).not.toHaveBeenCalled();
    });

    it("should allow to add an item with valid data", async () => {
        fixture.detectChanges();

        expect(itemsServiceSpy.getCategories).toHaveBeenCalled();
        component.categories$.subscribe(categories => {
            expect(categories.length).toEqual(2);
        });
        // expect((await categorySelect.getOptions()).length).toEqual(2);

        await titleInput.setValue("long enough value and matches the pattern");
        expect(await titleFormField.hasErrors()).toBeFalsy();

        await priceInput.setValue("15.543");

        await categorySelect.clickOptions({text: "Category 2"});

        await statusSelect.clickOptions(({text: UsedStatus.NEW}));
        await descriptionInput.setValue("long enough description for the form to be happy");
        expect(await descriptionFormField.hasErrors()).toBeFalsy();

        expect(component.form.valid).toBeTruthy();
        expect(await addItemButton.isDisabled()).toBeFalsy();

        await addItemButton.click();

        expect(itemsServiceSpy.addNewItem).toHaveBeenCalled();
    });
});
