import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {
  channelHandler  = new this.authService.sb.ChannelHandler()

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  

}
