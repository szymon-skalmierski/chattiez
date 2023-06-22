import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, filter } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class ChatGuard implements CanActivate {
    constructor(private authService:AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return (this.authService.authenticated.asObservable().pipe(filter(value=>value!==null)) as Observable<boolean>)
    }
}