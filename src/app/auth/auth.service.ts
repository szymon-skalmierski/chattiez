import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as SendBird from 'sendbird';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpiratonTimer: any;
  user = new BehaviorSubject<User | null>(null);

  sb: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.sb = new SendBird({appId: environment.APP_ID});
    SendBird.setLogLevel(SendBird.LogLevel.ERROR);
  }

  connect(userId: string, token: any) {
    this.sb.connect(userId, token, (user: any, error: any) => {
      if(user){
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        const userData = new User(userId, token, expirationDate)
        localStorage.setItem('userData', JSON.stringify(userData))
        this.user.next(userData)
        this.router.navigate(['/chat']);
      }
    });
  }

  isConnected(){
    return this.sb && this.sb.currentUser && this.sb.currentUser.userId;
  }

  getConnectedUser(){
    return this.sb && this.sb.currentUser ? this.sb.currentUser : null;
  }

  autoLogin() {
    if (!localStorage.getItem('userData')) {
      return;
    }

    const userData = JSON.parse(localStorage.getItem('userData')!);
    const loadedUser = new User(
      userData.userId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    
    if (loadedUser.token) {
      this.connect(loadedUser.userId, loadedUser.token)
      this.user.next(loadedUser);

      const expirationDuration = new Date(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );
      this.autoLogout(+expirationDuration);
    }
  }

  autoLogout(expirationTime: number) {
    this.tokenExpiratonTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpiratonTimer) {
      clearTimeout(this.tokenExpiratonTimer);
    }
    this.tokenExpiratonTimer = null;
  }
}
