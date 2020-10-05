import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {FullUser, FullUserResponse} from "@my-account/data/FullUser";
import { Observable } from "rxjs";
import {environment} from "@environments/environment";
import { map } from "rxjs/operators";

export const USER_API_URL = `${environment.apiUrl}/user`;

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getFullUser(): Observable<FullUser> {
        return this.http.get<FullUserResponse>(USER_API_URL).pipe(
            map(response => new FullUser(response))
        );
    }
}
