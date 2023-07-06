import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as SendBird from 'sendbird';

import { ChatService } from '../chat.service';
import { ChatRoomService } from './chat-room.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  channelHandler = new this.authService.sb.ChannelHandler();
  queryList!: any;
  channel!: SendBird.GroupChannel | any;
  groupUrl: any;
  messages: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private chatRoomService: ChatRoomService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.groupUrl = params['url'];
      this.authService.sb.GroupChannel.getChannel(this.groupUrl).then(
        (channel: any) => {
          if (channel) {
            this.channel = channel;
            this.queryList = channel.createPreviousMessageListQuery();
            this.reloadMsg(20);
          }
        }
      );
    });
    this.registerEventHandlers(this.chatRoomService.messages);
  }

  registerEventHandlers(messagesList: any) {
    this.channelHandler.onMessageReceived = (channel, message) => {
      this.chatRoomService.messages.unshift(message);
    };

    this.channelHandler.onMessageDeleted = (channel, messageId) => {
      const indexOfMsg = this.chatRoomService.messages
        .map((message) => message.messageId)
        .indexOf(messageId);
      console.log('delete msg:', indexOfMsg);
      this.chatRoomService.messages.splice(indexOfMsg, 1);
    };

    this.channelHandler.onUserReceivedInvitation = (channel, message) => {
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
    return this.chatRoomService.messages;
  }

  reloadMsg(limit: any) {
    this.chatRoomService.getMessagesFromChannel(
      this.queryList,
      limit,
      (messages: any) => this.chatRoomService.messages = messages
    );
  }

  leaveChat(channel: SendBird.GroupChannel) {
    channel.leave().then(() => {
      this.chatService.getMyGroupChannels();
      this.router.navigate(['/chat']);
    });
  }

  handleSendForm(form: any) {
    if (!form.valid) return;
    const message = form.value.message;
    this.chatRoomService.sendMessage(
      this.channel,
      message,
      this.authService.sb,
      (msg: any) => {
        this.chatRoomService.messages.unshift(msg);
      }
    );
    form.reset();
  }

  trackById(index: number, item: SendBird.UserMessage): number {
    return item.messageId;
  }
}
