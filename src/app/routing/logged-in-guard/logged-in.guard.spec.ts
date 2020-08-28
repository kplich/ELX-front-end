import {TestBed} from "@angular/core/testing";

import {LoggedInGuard} from "./logged-in.guard";
import {AuthenticationService} from "../../authentication/authentication-service/authentication.service";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";

// as per
// keepgrowing.in/angular/how-to-test-angular-authguard-examples-for-the-canactivate-interface/

describe("LoggedInGuard", () => {
  let guard: LoggedInGuard;
  let authenticationService: AuthenticationService;
  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: "/cookies"};
  const routerMock = { navigate: jasmine.createSpy("navigate").and.returnValue(true)};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggedInGuard,
        AuthenticationService,
        {provide: Router, useValue: routerMock}
      ],
      imports: [HttpClientTestingModule]
    });
    authenticationService = TestBed.inject(AuthenticationService);
    guard = TestBed.inject(LoggedInGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  it("should allow the authenticated user to access app", () => {
    spyOnProperty(authenticationService, "authenticatedUser").and.returnValue("username");
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });

  it("should redirect an unauthenticated user to the log-in page", async () => {
    spyOnProperty(authenticationService, "authenticatedUser").and.returnValue(null);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
    expect(routerMock.navigate).toHaveBeenCalledWith(["/log-in"]);
  });
});
