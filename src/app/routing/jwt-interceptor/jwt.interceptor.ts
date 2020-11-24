import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtStorageService} from "@shared/jwt-storage-service/jwt-storage.service";

/**
 * Authorization header prefix.
 */
export const AUTHORIZATION = "Authorization";

/**
 * Bearer authorization type prefix.
 */
export const BEARER = "Bearer";

/**
 * Interceptor that attaches the JWT to each outcoming request to allow for authorization
 * in the server-side.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private jwtService: JwtStorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.jwtService.getJwt() != null) {
            const jwt = this.jwtService.getJwt();
            return next.handle(request.clone({
                headers: request.headers.set(AUTHORIZATION, `${BEARER} ${jwt}`)
            }));
        }

        return next.handle(request);
    }
}
