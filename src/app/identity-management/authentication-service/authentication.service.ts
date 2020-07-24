import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {JwtStorageService} from '../../shared/jwt-storage-service/jwt-storage.service';
import {Credentials} from './Credentials';
import {PasswordChangeRequest} from './PasswordChangeRequest';
import {AUTHORIZATION, BEARER} from '../../routing/jwt-interceptor/jwt.interceptor';

export const API_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private jwtStorageService: JwtStorageService) { }

  get authenticatedUser(): string | null {
    return this.jwtStorageService.getAuthenticatedUser();
  }

  private static getTokenFromResponse(response: HttpResponse<any>): string {
    const header = response.headers.get(AUTHORIZATION);

    if (header.startsWith(BEARER)) {
      return header.replace(BEARER, '').trim();
    } else {
      throw new Error('Bearer JSON Web Token required!');
    }
  }

  logIn(credentials: Credentials): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${API_URL}/log-in`, credentials, {observe: 'response'}).pipe(
      tap(response => {
        if (response.ok) {
          this.jwtStorageService.putJwt(AuthenticationService.getTokenFromResponse(response));
        }
      }),
      shareReplay()
    );
  }

  changePassword(passwordChangeRequest: PasswordChangeRequest): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${API_URL}/change-password`, passwordChangeRequest, {observe: 'response'}).pipe(
      shareReplay()
    );
  }

  signUp(credentials: Credentials): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${API_URL}/sign-up`, credentials, {observe: 'response'}).pipe(
      shareReplay()
    );
  }

  logOut(): Promise<void> {
    return new Promise(_ => this.jwtStorageService.removeJwt());
  }
}
