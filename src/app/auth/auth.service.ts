import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as SendBird from 'sendbird';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = localStorage.getItem('username') && localStorage.getItem('token');
  sb: any;

  constructor(private http: HttpClient) { 
    this.sb = new SendBird({appId: environment.APP_ID});
    SendBird.setLogLevel(SendBird.LogLevel.ERROR);
  }

  connect(userId: string, token: any, callback: any) {
      this.sb.connect(userId, token, (user: any, error: any) => {
          callback(user, error);
      });
  }

  isConnected(){
      return this.sb && this.sb.currentUser && this.sb.currentUser.userId; 
  }

  getConnectedUser(){
      return this.sb && this.sb.currentUser ? this.sb.currentUser : null;
  }

  signout(){
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
}
