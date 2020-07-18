import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {API_URL, AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

// adapted from
// https://skryvets.com/blog/2018/02/18/unit-testing-angular-service-with-httpclient/#third-step-add-login-to-service

describe('AuthenticationService', () => {
  const signUpURL = `${API_URL}/sign-up`;
  const logInURL = `${API_URL}/log-in`;

  const correctNewUserCredentials = {username: 'username', password: 'P@ssw0rd'};
  const invalidNewUserCredentials = {username: 'username', password: 'password'};

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
    let response = null;

    authenticationService.signUp(correctNewUserCredentials).subscribe(resp => {
      response = resp;
    });

    const testRequest = httpTestingController.expectOne({url: signUpURL});
    testRequest.flush(expectedResponseBody);

    tick();

    expect(testRequest.request.method).toEqual('POST');
    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(200);
  }));

  it('should return an error response for invalid data', fakeAsync(() => {
    const expectedResponseBody = {};
    const expectedStatus = 400;
    let response = null;

    authenticationService.signUp(invalidNewUserCredentials).subscribe({
      next: _ => {
      },
      error: err => {
        response = err;
      }
    });

    const testRequest = httpTestingController.expectOne({url: signUpURL});
    testRequest.error(new ErrorEvent('Bad Request'), {status: expectedStatus});

    tick();

    console.log(`response status ${response.status}`);

    expect(testRequest.request.method).toEqual('POST');
    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toEqual(expectedStatus);
  }));
});
