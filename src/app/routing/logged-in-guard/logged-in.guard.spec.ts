import {TestBed} from '@angular/core/testing';

import {LoggedInGuard} from './logged-in.guard';
import {AuthenticationService} from '../../identity-management/authentication-service/authentication.service';
import {Router} from '@angular/router';

describe('LoggedInGuard', () => {
  const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['authenticatedUser']);
  const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

  let guard: LoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    });
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
