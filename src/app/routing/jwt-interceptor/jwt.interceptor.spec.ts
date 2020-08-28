import {TestBed} from "@angular/core/testing";

import {JwtInterceptor} from "./jwt.interceptor";
import {JwtStorageService} from "../../shared/jwt-storage-service/jwt-storage.service";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe("JwtInterceptor", () => {
  const AUTHORIZATION_HEADER = "Authorization";

  let jwtStorageService: JwtStorageService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JwtStorageService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
      ]
    });

    jwtStorageService = TestBed.inject(JwtStorageService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should not add any header when user isn't authenticated", () => {
    spyOn(jwtStorageService, "getJwt").and.returnValue(null);
    httpClient.get("/url").subscribe(_ => {});

    const testRequest = httpTestingController.expectOne("/url");
    expect(testRequest.request.headers.get(AUTHORIZATION_HEADER)).toBeNull();
  });


  it("should not add a header when user is authenticated", () => {
    const EXAMPLE_TOKEN = "example token";
    const EXPECTED_TOKEN = `Bearer ${EXAMPLE_TOKEN}`;

    spyOn(jwtStorageService, "getJwt").and.returnValue(EXAMPLE_TOKEN);
    httpClient.get("/url").subscribe(_ => {
    });

    const testRequest = httpTestingController.expectOne("/url");
    expect(testRequest.request.headers.get(AUTHORIZATION_HEADER)).toEqual(EXPECTED_TOKEN);
  });
});
