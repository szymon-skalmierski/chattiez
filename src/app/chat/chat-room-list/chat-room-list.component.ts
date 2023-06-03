import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {
  numberOfMessages = 0;
  channels: any = new BehaviorSubject<any[]>([]);

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.chatGroups.subscribe({
      next: (channels: any)=>{
        this.numberOfMessages = channels === null ? 0 : channels.length;
        this.channels.next(channels);
      }
    })
  }
}
