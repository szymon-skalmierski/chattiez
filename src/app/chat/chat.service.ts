import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as SendBird from 'sendbird';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  chatGroups = new BehaviorSubject<SendBird.GroupChannelCollection | null>(
    null
  );
  channelHandler = new this.authService.sb.ChannelHandler();

  constructor(private authService: AuthService) {
  }

  getMyGroupChannels() {
    const listQuery =
      this.authService.sb.GroupChannel.createMyGroupChannelListQuery();
    listQuery.includeEmpty = true;
    listQuery.memberStateFilter = 'joined_only';
    listQuery.order = 'latest_last_message';
    listQuery.limit = 10;
    if (listQuery.hasNext) {
      listQuery.next((groupChannels: any, error: any) => {
        this.chatGroups.next(groupChannels);
      });
    }
  }


  registerEventHandlers(messagesList: any) {
    this.channelHandler.onMessageReceived = (channel, message) => {
      messagesList.unshift(message);
    };
    this.channelHandler.onChannelDeleted = () => {
      this.getMyGroupChannels();
    };
    this.channelHandler.onUserLeft = () => {
      console.log("User left the chat")
    };

    this.authService.sb.addChannelHandler(
      '6f688da4e9a446de',
      this.channelHandler
    );
  }
}
