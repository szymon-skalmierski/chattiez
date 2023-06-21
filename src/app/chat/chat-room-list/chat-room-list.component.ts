import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit, OnDestroy {
  chatGroupsSub!: Subscription
  channels: any;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatGroupsSub = this.chatService.chatGroups.subscribe({
      next: (channels: any)=>{
        this.channels = channels;
      }
    })
  }

  ngOnDestroy(): void {
    this.chatGroupsSub.unsubscribe();
  }
}
