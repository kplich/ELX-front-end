import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

// adapted from
// https://skryvets.com/blog/2018/02/18/unit-testing-angular-service-with-httpclient/#third-step-add-login-to-service

describe('AuthenticationService', () => {
  const newUserCredentials = {username: 'newUsername', password: 'newP@ssw0rd'};

  let authenticationService: AuthenticationService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });

    authenticationService = TestBed.inject(AuthenticationService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should sign up correctly', () => {

    fakeAsync(() => {
        const url = 'https://example.com/login';
        const expectedResponseBody = {};
        const credentials = newUserCredentials;
        let response = null;

        authenticationService.logIn(credentials).subscribe({
          next: resp => {
            response = resp;
          },
          error: _ => {
          }
        });

        const requestWrapper = httpTestingController.expectOne({url});
        requestWrapper.flush(expectedResponseBody);

        tick();

        expect(requestWrapper.request.method).toEqual('POST');
        expect(response.body).toEqual(expectedResponseBody);
        expect(response.status).toBe(200);
      }
    );
  });
});
