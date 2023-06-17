import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as SendBird from 'sendbird';
import { environment as env } from 'src/environments/environment';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  sb: SendBird.SendBirdInstance;
  
  private tokenExpiratonTimer: any;
  authError: any = new BehaviorSubject(null);
  user = new BehaviorSubject<User | null>(null);
  userInfo: any = {}


  constructor(private router: Router, private http: HttpClient) {
    this.sb = new SendBird({ appId: env.APP_ID });
    SendBird.setLogLevel(SendBird.LogLevel.ERROR);
  }

  login(email: string, password: string) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.firebase_key}`, {
      email: email,
      password: password
    })
  }

  connect(userId: string, token: string) {
    return this.sb.connect(userId, '', (user: SendBird.User, error: SendBird.SendBirdError) => {
      if (user) {
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        const userData = new User(userId, token, expirationDate);

        if (this.authError.value) {
          this.authError.next(null);
        }

        if (!localStorage.getItem('userData')) {
          localStorage.setItem('userData', JSON.stringify(userData));
          this.user.next(userData);
          this.autoLogout(new Date(+expirationDate).getTime() - new Date().getTime());
        }
      } else if (error) {
        if (this.user.value){
          this.logout();
        }
        this.authError.next(error);
      }
    }).catch((err)=>console.log(err));
  }

  getConnectedUserId() {
    return this.sb && this.sb.currentUser && this.sb.currentUser.userId;
  }

  getConnectedUser() {
    return this.sb && this.sb.currentUser ? this.sb.currentUser : null;
  }

  autoLogin() {
    if (!localStorage.getItem('userData')) {
      return;
    }
    console.log('autologin authservice prev')

    const userData = JSON.parse(localStorage.getItem('userData')!);
    const loadedUser = new User(
      userData.userId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.connect(loadedUser.userId, '');
      this.user.next(loadedUser);

      const expirationDuration = new Date(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );
      this.autoLogout(+expirationDuration);
    } else {
      this.logout();
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
    this.sb.disconnect();
    if (this.tokenExpiratonTimer) {
      clearTimeout(this.tokenExpiratonTimer);
    }
    this.tokenExpiratonTimer = null;
  }
}
