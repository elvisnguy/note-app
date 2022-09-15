import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access-token');
    // if the token is  stored in localstorage add it to http header
    let headers = new HttpHeaders();
    if (accessToken) {
      headers = headers
        .set('access-token', `${accessToken}`)
        .set('authorization', `${accessToken}`);
    }

    //clone http to the custom AuthRequest and send it to the server
    const AuthRequest = request.clone({ headers: headers });
    return next.handle(AuthRequest);
  }
}
