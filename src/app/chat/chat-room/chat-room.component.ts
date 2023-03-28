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

  
  trackById(index: number, item: any): number {
    return item.id;
  }
}
