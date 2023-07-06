import { Component, Input } from '@angular/core';
import * as SendBird from 'sendbird';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chat-room-message',
  templateUrl: './chat-room-message.component.html',
  styleUrls: ['./chat-room-message.component.css'],
})
export class ChatRoomMessageComponent {
  @Input() message!: SendBird.UserMessage | SendBird.AdminMessage;
  @Input() channel!: SendBird.GroupChannel;

  constructor(private authService: AuthService) {}

  getUserId() {
    return this.authService.getConnectedUserId();
  }

  getSenderId() {
    let msg = this.message as SendBird.UserMessage;
    return msg.sender?.nickname ? msg.sender?.nickname : msg.sender?.userId;
  }

  onMessageDelete(
    channel: SendBird.GroupChannel | SendBird.OpenChannel,
    message: SendBird.UserMessage | SendBird.AdminMessage
  ) {
    channel.deleteMessage(message as SendBird.UserMessage, () => {});
  }
}
