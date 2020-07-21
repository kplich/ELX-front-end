import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {JwtResponse} from './JwtResponse';
import {shareReplay, tap} from 'rxjs/operators';
import {JwtStorageService} from '../../shared/jwt-storage-service/jwt-storage.service';
import {Credentials} from './Credentials';
import { PasswordChangeRequest } from './PasswordChangeRequest';

export const API_URL = `${environment.apiUrl}/auth`;

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

  changePassword(passwordChangeRequest: PasswordChangeRequest): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${API_URL}/change-password`, passwordChangeRequest, {observe: 'response'}).pipe(
      shareReplay()
    )
  }

  signUp(credentials: Credentials): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${API_URL}/sign-up`, credentials, {observe: 'response'}).pipe(
      shareReplay()
    );
  }

  logOut(): Promise<void> {
    return new Promise(_ => this.jwtStorageService.removeJwt());
  }

  get authenticatedUser(): string | null {
    return this.jwtStorageService.getAuthenticatedUser();
  }
}
