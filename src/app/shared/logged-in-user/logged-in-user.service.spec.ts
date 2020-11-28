import {TestBed} from "@angular/core/testing";

import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {JwtStorageService} from "@shared/jwt-storage-service/jwt-storage.service";
import {SimpleUser} from "@my-account/data/SimpleUser";

describe("LoggedInUserService", () => {
    let loggedInUserService: LoggedInUserService;
    let jwtStorageService: JwtStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [JwtStorageService],
        });
        loggedInUserService = TestBed.inject(LoggedInUserService);
        jwtStorageService = TestBed.inject(JwtStorageService);
    });

    it("should be created", () => {
        expect(loggedInUserService).toBeTruthy();
    });

    describe("authenticatedUser()", () => {

        it("should return the user when the JWT storage returns it", () => {
            const expectedUser = new SimpleUser({id: 1, ethereumAddress: null, username: "username"});

            spyOn(jwtStorageService, "getAuthenticatedUser").and.returnValue(expectedUser);
            expect(loggedInUserService.authenticatedUser?.equals(expectedUser)).toBeTruthy();
        });

        it("should return null when JWT storage returns null", () => {
            spyOn(jwtStorageService, "getAuthenticatedUser").and.returnValue(null);
            expect(loggedInUserService.authenticatedUser).toBeNull();
        });
    });
});
