import {TestBed} from "@angular/core/testing";

import {LoggedInGuard} from "./logged-in.guard";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LoggedInUserService} from "../../shared/logged-in-user/logged-in-user.service";

// as per
// keepgrowing.in/angular/how-to-test-angular-authguard-examples-for-the-canactivate-interface/

describe("LoggedInGuard", () => {
    let guard: LoggedInGuard;
    let loggedInUserService: LoggedInUserService;
    const routeMock: any = {snapshot: {}};
    const routeStateMock: any = {snapshot: {}, url: "/cookies"};
    const routerMock = {navigate: jasmine.createSpy("navigate").and.returnValue(true)};

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoggedInGuard,
                LoggedInUserService,
                {provide: Router, useValue: routerMock}
            ],
            imports: [HttpClientTestingModule]
        });
        loggedInUserService = TestBed.inject(LoggedInUserService);
        guard = TestBed.inject(LoggedInGuard);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });

    it("should allow the authenticated user to access app", () => {
        spyOnProperty(loggedInUserService, "authenticatedUser").and.returnValue("username");
        expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
    });

    it("should redirect an unauthenticated user to the log-in page", async () => {
        spyOnProperty(loggedInUserService, "authenticatedUser").and.returnValue(null);
        expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
        expect(routerMock.navigate).toHaveBeenCalledWith(["/log-in"]);
    });
});
