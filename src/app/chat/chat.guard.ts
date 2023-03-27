import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class ChatGuard implements CanActivate, OnDestroy {
    sub: Subscription
    isLoggedIn!: boolean
    constructor(private authService:AuthService, private router: Router){
        this.sub = this.authService.user.subscribe((user:any)=>{
            this.isLoggedIn = !!user;
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.isLoggedIn){
            return true
        }
        this.router.navigate(['/auth'])
        return false;
    }
    
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}