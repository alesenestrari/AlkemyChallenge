import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

    constructor(private userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.userService.userToken.pipe(
            take(1),
            exhaustMap(userToken => {
                if (!userToken) {
                    return next.handle(req);
                }
                const modReq = req.clone({
                    params: new HttpParams().set('token', userToken.token)
                });
                return next.handle(modReq);
            })
        );
    }

}