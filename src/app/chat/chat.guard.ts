import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Observable, filter, map } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class ChatGuard  {
    constructor(private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return (this.authService.user.pipe(filter(value => value!==undefined), map(value => !!value)) as Observable<boolean>)
    }
}
