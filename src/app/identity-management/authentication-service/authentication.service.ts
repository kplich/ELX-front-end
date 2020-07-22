import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {JwtStorageService} from '../../shared/jwt-storage-service/jwt-storage.service';
import {Credentials} from './Credentials';

export const API_URL = `${environment.apiUrl}/auth`;

export const AUTHORIZATION = 'AUTHORIZATION';
export const BEARER_WHITESPACE = 'Bearer ';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private jwtStorageService: JwtStorageService) { }

  get authenticatedUser(): string | null {
    return this.jwtStorageService.getAuthenticatedUser();
  }

  private static getTokenFromResponse(response: HttpResponse<any>): string {
    console.log(response);

    const header = response.headers.get(AUTHORIZATION);
    console.log(header);

    if (header.startsWith(BEARER_WHITESPACE)) {
      return header.replace(BEARER_WHITESPACE, '');
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

  signUp(credentials: Credentials): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${API_URL}/sign-up`, credentials, {observe: 'response'}).pipe(
      shareReplay()
    );
  }

  logOut() {
    this.jwtStorageService.removeJwt();
  }
}
