import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatRoomService } from '../chat-room.service';

@Component({
  selector: 'app-chat-room-message',
  templateUrl: './chat-room-message.component.html',
  styleUrls: ['./chat-room-message.component.css']
})
export class ChatRoomMessageComponent implements OnInit {
  @Input() message: any;
  @Input() channel: any;

  constructor(private authService: AuthService, private chatRoomService: ChatRoomService) { }

  ngOnInit(): void {
  }

  getUserId() {
    return this.authService.getConnectedUserId();
  }

  onMessageDelete(channel:SendBird.GroupChannel | SendBird.OpenChannel, message:SendBird.UserMessage){
    channel.deleteMessage(message, ()=>{
      this.chatRoomService.messages.splice(this.chatRoomService.messages.indexOf(message), 1);
      if(this.chatRoomService.messages.length<=15){
        this.chatRoomService.limit=7;
        this.chatRoomService.setFetchedChannels(channel, this.chatRoomService.limit+=8)
      }
    })
  }
}
