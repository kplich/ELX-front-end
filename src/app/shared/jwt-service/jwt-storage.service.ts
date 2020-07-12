import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';

export const JWT_TAG = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService {

  constructor() { }

  putJwt(token: string) {
    sessionStorage.setItem(JWT_TAG, token);
  }

  getJwt(): string | null {
    return sessionStorage.getItem(JWT_TAG);
  }

  removeJwt() {
    sessionStorage.removeItem(JWT_TAG);
  }

  getAuthenticatedUser() {
    const token = sessionStorage.getItem(JWT_TAG);

    if (token === null) {
      return '';
    }
    else {
      const payload = jwt.decode(token);
      return payload.sub;
    }

  }
}
