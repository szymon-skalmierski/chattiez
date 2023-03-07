import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as SendBird from 'sendbird';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class ChatService {
    constructor(private http: HttpClient){}
}