import { Injectable, Query } from '@angular/core';
import * as SendBird from 'sendbird';

@Injectable({providedIn: 'root'})

export class ChatService{
    sb:any
    APP_ID = 'C1F300B2-59F1-4A71-B833-D1375D7358D3'

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
}