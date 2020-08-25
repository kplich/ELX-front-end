import { Injectable } from '@angular/core';
import {SimpleUser} from "../../my-account/user-service/data/SimpleUser";
import {JwtStorageService} from "../jwt-storage-service/jwt-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  constructor(private jwtStorageService: JwtStorageService) { }

    get authenticatedUser(): SimpleUser | null {
        return this.jwtStorageService.getAuthenticatedUser();
    }
}
