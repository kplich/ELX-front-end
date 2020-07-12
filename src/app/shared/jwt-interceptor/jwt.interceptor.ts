import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtStorageService} from '../jwt-storage-service/jwt-storage.service';

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
