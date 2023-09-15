import { NgForm } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as SendBird from 'sendbird';

import { ChatService } from '../chat.service';
import { ChatRoomService } from './chat-room.service';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('chatWindow') chatWindow!: ElementRef;
  groupUrl!: string;
  channel!: SendBird.GroupChannel;
  queryList!: SendBird.PreviousMessageListQuery;
  channelHandler = new this.authService.sb.ChannelHandler();
  messages = new BehaviorSubject<any>([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private chatRoomService: ChatRoomService,
    private authService: AuthService,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.groupUrl = params['url'];
      this.authService.sb.GroupChannel.getChannel(this.groupUrl).then(
        (channel: SendBird.GroupChannel) => {
          if (channel) {
            this.channel = channel;
            this.queryList = channel.createPreviousMessageListQuery();
            this.reloadMsg(20);
          }
        }
      );
    });

    this.chatRoomService.messagesChanged.subscribe(()=>{
      this.getMessages();
    })

    this.registerEventHandlers(this.chatRoomService.messages);
  }

  registerEventHandlers(messagesList: (SendBird.UserMessage | SendBird.AdminMessage)[]): void {
    this.channelHandler.onMessageReceived = (channel, message: SendBird.AdminMessage | SendBird.UserMessage) => {
      this.chatRoomService.messages.unshift(message);
      this.chatRoomService.messagesChanged.next(true);
    };

    this.channelHandler.onMessageDeleted = (channel, messageId: number) => {
      const indexOfMsg = this.chatRoomService.messages
        .map((message) => message.messageId)
        .indexOf(messageId);
      console.log('delete msg:', indexOfMsg);
      this.chatRoomService.messages.splice(indexOfMsg, 1);
      this.chatRoomService.messagesChanged.next(true);
    };

    this.channelHandler.onUserReceivedInvitation = (channel) => {
      this.chatService.getMyGroupChannels();
    };

    this.channelHandler.onChannelDeleted = () => {
      this.chatService.getMyGroupChannels();
    };

    this.channelHandler.onUserLeft = () => {
      console.log('User left the chat');
    };

    this.authService.sb.addChannelHandler(
      '6f688da4e9a446de',
      this.channelHandler
    );
  }

  getMessages() {
    this.messages.next(this.chatRoomService.messages);
  }

  reloadMsg(limit: number): void {
    this.chatRoomService.getMessagesFromChannel(
      this.queryList,
      limit,
      (messages: (SendBird.UserMessage | SendBird.AdminMessage)[]) => {
        this.chatRoomService.messages = messages;
        this.chatRoomService.messagesChanged.next(true);
      }
    );
  }

  leaveChat(): void {
    this.channel.leave().then(() => {
      this.chatService.getMyGroupChannels();
      this.router.navigate(['/chat']);
    });
  }

  addUser(user: string) {
    this.channel.inviteWithUserIds([user]).then(()=>{
      console.log('User has been added to the chat')
    });
  }

  handleSendForm(form: NgForm): void {
    if (!form.valid) return;
    const message = form.value.message;
    this.chatRoomService.sendMessage(
      this.channel,
      message,
      this.authService.sb,
      (msg: SendBird.AdminMessage | SendBird.UserMessage) => {
        this.chatRoomService.messages.unshift(msg);
      }
    );
    form.reset();
  }

  getLastMessage(index: number) {
    return this.chatRoomService.getLastMessage(index);
  }

  trackById(index: number, item: SendBird.UserMessage | SendBird.AdminMessage): number {
    return item.messageId;
  }

  getSenderId(message: SendBird.UserMessage | SendBird.AdminMessage | undefined) {
    if(message){
      return (message as SendBird.UserMessage).sender?.nickname || (message as SendBird.UserMessage).sender?.userId;
    }
    return null;
  }

  scrollToBottom() {
    (this.chatWindow.nativeElement as HTMLDivElement).scrollTo({top: 0, behavior: 'smooth'});
  }
}
