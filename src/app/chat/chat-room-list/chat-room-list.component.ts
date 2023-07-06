import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import * as SendBird from 'sendbird';

import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css'],
})
export class ChatRoomListComponent implements OnInit, OnDestroy {
  chatGroupsSub!: Subscription;
  channels!: (SendBird.GroupChannel)[];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatGroupsSub = this.chatService.chatGroups.subscribe({
      next: (channels: SendBird.GroupChannel[] | null) => {
        if(channels) this.channels = channels;
      },
    });
  }

  getLastMessage(group: SendBird.GroupChannel) {
    if(group.lastMessage?.isFileMessage) return 'Sent file'
    return (group.lastMessage as SendBird.UserMessage | SendBird.AdminMessage).message;
  }

  ngOnDestroy(): void {
    this.chatGroupsSub.unsubscribe();
  }
}
