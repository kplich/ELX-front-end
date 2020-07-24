import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {API_URL, AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpErrorResponse} from '@angular/common/http';
import {JwtStorageService} from '../../shared/jwt-storage-service/jwt-storage.service';

// adapted from
// https://skryvets.com/blog/2018/02/18/unit-testing-angular-service-with-httpclient/#third-step-add-login-to-service

describe('AuthenticationService signing up', () => {
  const signUpURL = `${API_URL}/sign-up`;

  const userCredentials = {username: 'username', password: 'password'};

  let authenticationService: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });

    authenticationService = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should sign up correctly with correct credentials', fakeAsync(() => {
    const expectedResponseBody = {};
    const expectedStatus = 200;
    let response = null;

    authenticationService.signUp(userCredentials).subscribe(resp => {
      response = resp;
    });

    const testRequest = httpTestingController.expectOne({url: signUpURL});
    testRequest.flush(expectedResponseBody);

    tick();

    expect(testRequest.request.method).toEqual('POST');
    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(expectedStatus);
  }));

  it('should return an error response for invalid login data', fakeAsync(() => {
    const expectedStatus = 400;
    let response = null;

    authenticationService.signUp(userCredentials).subscribe({
      next: _ => {
      },
      error: err => {
        response = err;
      }
    });

    const testRequest = httpTestingController.expectOne({url: signUpURL});
    testRequest.error(new ErrorEvent('Bad Request'), {status: expectedStatus});

    tick();

    expect(testRequest.request.method).toEqual('POST');
    expect(response.status).toEqual(expectedStatus);
  }));


});

describe('AuthenticationService logging in', () => {
  const LOGIN_API_URL = `${API_URL}/log-in`;

  const EXAMPLE_USERNAME = 'username2';
  // noinspection SpellCheckingInspection
  const EXAMPLE_JWT = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTIifQ.SCOWl0eWOb14t3BicSyNRlOlSVV8gQFkpeJGswPHbUo!';

  const USER_CREDENTIALS = {username: EXAMPLE_USERNAME, password: 'password'};

  let authenticationService: AuthenticationService;
  let jwtStorageService: JwtStorageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService, JwtStorageService]
    });

    authenticationService = TestBed.inject(AuthenticationService);
    jwtStorageService = TestBed.inject(JwtStorageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /*it('should save the token after successful login and remove it after logout', fakeAsync(() => {
    const expectedResponseBody = {};
    const expectedStatus = 200;
    // can't read these guys later :/
    const expectedHeaders = new HttpHeaders();
    expectedHeaders.append(AUTHORIZATION, `${BEARER} ${EXAMPLE_JWT}`);
    let response: HttpResponse<any> = null;

    authenticationService.logIn(USER_CREDENTIALS).subscribe(resp => {
      response = resp;
    });

    const testRequest = httpTestingController.expectOne({url: LOGIN_API_URL});
    testRequest.flush(expectedResponseBody, {headers: expectedHeaders});

    tick();

    expect(testRequest.request.method).toEqual('POST');
    expect(response.headers).toEqual(expectedHeaders);
    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toEqual(expectedStatus);

    expect(authenticationService.authenticatedUser).toEqual(EXAMPLE_USERNAME);
    expect(authenticationService.authenticatedUser).not.toEqual(ANYTHING_ELSE);

    authenticationService.logOut();

    expect(authenticationService.authenticatedUser).toBeNull();
  }));*/

  it('should not save token after unsuccessful login', fakeAsync(() => {
    const expectedStatus = 401;
    let error: HttpErrorResponse = null;

    authenticationService.logIn(USER_CREDENTIALS).subscribe({
      next: _ => {},
      error: err => {
        error = err;
      }
    });

    const testRequest = httpTestingController.expectOne({url: LOGIN_API_URL});
    testRequest.error(new ErrorEvent('Unauthorized'), {status: expectedStatus});

    tick();

    expect(testRequest.request.method).toEqual('POST');
    expect(error.status).toEqual(expectedStatus);

    expect(authenticationService.authenticatedUser).toBeNull();
  }));
});
