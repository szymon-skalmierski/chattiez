import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as SendBird from 'sendbird';

@Injectable({providedIn: 'root'})

export class ChatService {
    constructor(private http: HttpClient){}
    sb:any
    APP_ID = 'C1F300B2-59F1-4A71-B833-D1375D7358D3'
    API_KEY = '718e04b1d4bd54ba9ca74d01f5b2029ae0e28fd2'
    user_id = 'sendbird_desk_agent_id_401c463d-80fe-460e-8ce9-88e8da4fd89b'

    init(){
        this.sb = new SendBird({appId: this.APP_ID});
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

    doit(){
        const httpheaders = new HttpHeaders({'Api-Token': this.API_KEY})
        return this.http.get(
            `https://api-${this.APP_ID}.sendbird.com/v3/users/${this.user_id}`,
            {headers: httpheaders}
            ).subscribe((response) => {
            console.log(response);
          });
    }
}