import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Observable, filter, map } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class ChatGuard  {
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.authService.user.value===null) {
        this.router.navigate(['/auth', 'login']);
        return false;
      }
      return (this.authService.user.pipe(filter(value => value!==undefined), map(value => !!value)) as Observable<boolean>)
    }
}
