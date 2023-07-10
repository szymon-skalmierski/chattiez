import { Component, Input, OnInit } from '@angular/core';
import * as SendBird from 'sendbird';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chat-room-message',
  templateUrl: './chat-room-message.component.html',
  styleUrls: ['./chat-room-message.component.css'],
})
export class ChatRoomMessageComponent implements OnInit {
  @Input() sender: any;
  @Input() channel!: SendBird.GroupChannel;
  @Input() message!: SendBird.UserMessage | SendBird.AdminMessage;
  adminMessage = false;
  connectedUserMessage = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.adminMessage = this.message.messageType==='admin';
    this.connectedUserMessage = this.sender===this.getUserId();
  }

  getUserId() {
    return this.authService.getConnectedUserId();
  }

  onMessageDelete(
    channel: SendBird.GroupChannel | SendBird.OpenChannel,
    message: SendBird.UserMessage | SendBird.AdminMessage
  ) {
    channel.deleteMessage(message as SendBird.UserMessage, () => {});
  }
}
