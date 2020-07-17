import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtStorageService} from '../../shared/jwt-storage-service/jwt-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtService.getJwt() != null) {
      const jwt = this.jwtService.getJwt();
      return next.handle(request.clone({
        headers: request.headers.set('Authorization', `Bearer ${jwt}`)
      }));
    }

    return next.handle(request);
  }
}