import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatRoomComponent } from '../chat-room.component';

@Component({
  selector: 'app-chat-room-message',
  templateUrl: './chat-room-message.component.html',
  styleUrls: ['./chat-room-message.component.css']
})
export class ChatRoomMessageComponent implements OnInit {
  @Input() message: any;
  @Input() channel: any;

  constructor(private authService: AuthService, private chatRoomComponent: ChatRoomComponent) { }

  ngOnInit(): void {
  }

  getUserId() {
    return this.authService.getConnectedUserId();
  }

  onMessageDelete(channel:SendBird.GroupChannel | SendBird.OpenChannel, message:SendBird.UserMessage){
    channel.deleteMessage(message, ()=>{
      this.chatRoomComponent.reloadMsg(this.chatRoomComponent.limit);
    })
  }
}
