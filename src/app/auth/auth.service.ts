import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import * as SendBird from 'sendbird';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  sb:any;

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
}
