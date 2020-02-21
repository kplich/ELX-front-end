import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdentityManagementService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post('/api/login', {username, password})
      // this is just the HTTP call,
      // we still need to handle the reception of the token
      // .shareReplay(); - this was in the tutorial
  }
}
