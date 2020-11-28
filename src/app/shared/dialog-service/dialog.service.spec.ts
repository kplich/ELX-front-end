import {TestBed} from "@angular/core/testing";

import {DialogService} from "@shared/dialog-service/dialog.service";
import {MaterialModule} from "@material/material.module";
import {MatDialog} from "@angular/material/dialog";
import {ErrorComponent} from "@shared/error/error.component";


xdescribe("DialogService", () => {
    let service: DialogService;
    const dialogServiceMock = jasmine.createSpyObj("snackBar", ["open"]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                {provide: MatDialog, useValue: dialogServiceMock}
            ]
        });
        service = TestBed.inject(DialogService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should execute open method of MatDialog spy", () => {
        service.openDialog(ErrorComponent, "any");
        expect(dialogServiceMock.open).toHaveBeenCalled();

        service.openDialogForData(ErrorComponent, "any");
        expect(dialogServiceMock.open).toHaveBeenCalled();
    });
});
