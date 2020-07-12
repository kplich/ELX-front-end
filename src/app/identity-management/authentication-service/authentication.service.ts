import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {JwtResponse} from './JwtResponse';
import {shareReplay, tap} from 'rxjs/operators';
import {JwtStorageService} from '../../shared/jwt-service/jwt-storage.service';
import {Credentials} from './Credentials';

const API_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private jwtStorageService: JwtStorageService) { }

  logIn(credentials: Credentials): Observable<HttpResponse<JwtResponse>> {
    return this.httpClient.post<JwtResponse>(`${API_URL}/log-in`, credentials, {observe: 'response'}).pipe(
      tap(response => this.jwtStorageService.putJwt(response.body.jwtToken)),
      shareReplay()
    );
  }

  signUp(credentials: Credentials): Observable<HttpResponse<JwtResponse>> {
    return this.httpClient.post<JwtResponse>(`${API_URL}/sign-up`, credentials, {observe: 'response'}).pipe(
      tap(response => this.jwtStorageService.putJwt(response.body.jwtToken)),
      shareReplay()
    );
  }

  logOut() {
    this.jwtStorageService.removeJwt();
  }

  get authenticatedUser(): string {
    return this.jwtStorageService.getAuthenticatedUser();
  }
}
