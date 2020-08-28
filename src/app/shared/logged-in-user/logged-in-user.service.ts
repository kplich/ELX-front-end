import { Injectable } from '@angular/core';
import {SimpleUser} from '@my-account/data/SimpleUser';
import {JwtStorageService} from '@shared/jwt-storage-service/jwt-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  constructor(private jwtStorageService: JwtStorageService) { }

    get authenticatedUser(): SimpleUser | null {
        return this.jwtStorageService.getAuthenticatedUser();
    }
}
