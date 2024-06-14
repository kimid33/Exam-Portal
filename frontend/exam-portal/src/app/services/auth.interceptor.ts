import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService:LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add the jwt token (localStorage) request
        let authReq=req;
        const token=this.loginService.getToken();
        if(token!=null)
            {
                authReq = authReq.clone({
                    setParams: {Authorization: `${token}`},
                });
            }
            return next.handle(authReq);
    }   
}

export const AuthInterceptorProviders =[{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
},
];