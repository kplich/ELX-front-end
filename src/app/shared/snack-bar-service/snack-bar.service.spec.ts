import {TestBed} from "@angular/core/testing";

import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MaterialModule} from "@material/material.module";

describe("SnackBarService", () => {
    let service: SnackBarService;
    const snackBarMock = jasmine.createSpyObj("snackBar", ["open"]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SnackBarService,
                {provide: MatSnackBar, useValue: snackBarMock}
            ],
            imports: [ MaterialModule ]
        });
        service = TestBed.inject(SnackBarService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should execute open method of MatSnackBar spy", () => {
        service.openSnackBar("any");
        expect(snackBarMock.open).toHaveBeenCalled();
    });
});
