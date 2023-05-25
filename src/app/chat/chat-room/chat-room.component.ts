import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import * as SendBird from 'sendbird';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  channel!: SendBird.GroupChannel | any;
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
          if(channel){
            this.channel = channel;
            this.reloadMsg(this.limit);
          }
        }
      );
    });
    this.chatService.registerEventHandlers(this.messages);
  }

  reloadMsg(limit: any) {
    this.chatService.getMessagesFromChannel(
      this.channel,
      limit,
      (messages:any)=>this.messages = messages
    );
  }
  leaveGroupChat(channel:any){
    this.chatService.leaveChat(channel);
    this.channel = null
  }

  getUserId() {
    return this.authService.getConnectedUserId();
  }

  handleSendForm(form: any){
    if(!form.valid) return;
    const message = form.value.message;
    this.chatService.sendMessage(this.channel, message, (msg: any) => {
      this.messages.unshift(msg);
    });
    form.reset();
  }

  onMessageDelete(message:SendBird.UserMessage, index:number){
    this.chatService.deleteMessage(this.channel, message, ()=>{});
    this.messages.splice(index, 1);
  }

  
  trackById(index: number, item: any): number {
    return item.messageId;
  }
}
