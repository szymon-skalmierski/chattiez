import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {
  // channelHandler  = new this.authService.sb.ChannelHandler()
  channels: any

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.fetchGroupChannels()
  }

  fetchGroupChannels(){
    this.chatService.getMyGroupChannels((channels: any)=>{
      this.channels = channels
    });
  }

}
