import {TestBed, fakeAsync} from "@angular/core/testing";

import {DialogService} from "@shared/dialog-service/dialog.service";
import {MaterialModule} from "@material/material.module";
import {MatDialog} from "@angular/material/dialog";
import {ErrorComponent} from "@shared/error/error.component";
import {of} from "rxjs";

describe("DialogService", () => {
    let service: DialogService;
    const dialogValue = "value";
    const dialogServiceMock = jasmine.createSpyObj("snackBar", {
        open: jasmine.createSpyObj("dialogRef", {
            afterClosed: of(dialogValue)
        })
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DialogService,
                {provide: MatDialog, useValue: dialogServiceMock}
            ],
            imports: [MaterialModule]
        });
        service = TestBed.inject(DialogService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("openDialog()", () => {
        it("should execute open method of MatDialog spy", () => {
            service.openDialog(ErrorComponent, "any");
            expect(dialogServiceMock.open).toHaveBeenCalled();
        });
    });

    describe("openDialogForData()", () => {
        it("should execute open method of MatDialog spy", () => {
            service.openDialogForData<string>(ErrorComponent, "any");
            expect(dialogServiceMock.open).toHaveBeenCalled();
        });

        it("should return a value as an Observable", fakeAsync(() => {
            const result = service.openDialogForData<string>(ErrorComponent, "any");
            result.subscribe(r => {
                expect(r).toEqual(dialogValue);
            });
        }));
    });
});
