import { Component, Input } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chat-room-message',
  templateUrl: './chat-room-message.component.html',
  styleUrls: ['./chat-room-message.component.css'],
})
export class ChatRoomMessageComponent {
  @Input() message: any;
  @Input() channel: any;

  constructor(private authService: AuthService) {}

  getUserId() {
    return this.authService.getConnectedUserId();
  }

  onMessageDelete(
    channel: SendBird.GroupChannel | SendBird.OpenChannel,
    message: SendBird.UserMessage
  ) {
    channel.deleteMessage(message, () => {});
  }
}
