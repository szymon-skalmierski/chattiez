import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  msgInterval: any;
  channel: any;
  messages: any[] = [];
  groupUrl: any;
  limit = 15;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.groupUrl = params['url'];
      this.authService.sb.GroupChannel.getChannel(this.groupUrl).then(
        (channel: any) => {
          this.channel = channel;
          this.reloadMsg(this.limit);
          // this.msgInterval = setInterval(()=>{
          //   this.chatService.getMessagesFromChannel(channel, (messages:any)=>this.messages = messages)
          // }, 1000)
        }
      );
      clearInterval(this.msgInterval);
    });
  }

  reloadMsg(limit: any) {
    this.chatService.getMessagesFromChannel(
      this.channel,
      limit,
      (messages:any)=>this.messages = messages
    );
  }

  getUserId() {
    return this.authService.isConnected();
  }

  sendMsg(channel: any, msg: any) {
    this.chatService.sendMessage(channel, msg, (msg: any) => {
      console.log(msg);
    });
  }

  
  trackById(index: number, item: any): number {
    return item.id;
  }
}
