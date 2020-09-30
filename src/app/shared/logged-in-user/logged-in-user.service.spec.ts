import {TestBed} from "@angular/core/testing";

import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

describe("LoggedInUserService", () => {
    let service: LoggedInUserService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoggedInUserService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
