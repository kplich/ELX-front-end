import {TestBed} from "@angular/core/testing";

import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

describe("SnackBarService", () => {
    let service: SnackBarService;

    const snackBarMock = jasmine.createSpyObj("snackBar", ["open"]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SnackBarService, {
                provide: MatSnackBar, useValue: snackBarMock
            }],
            imports: [MatSnackBarModule]
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
