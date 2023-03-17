import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  listQuery: any;

  constructor(private authService: AuthService) {
    this.listQuery = this.authService.sb.GroupChannel.createMyGroupChannelListQuery();
  }

  async getMyGroupChannels() {
    let channel = null
    this.listQuery.includeEmpty = true;
    this.listQuery.memberStateFilter = 'joined_only';
    this.listQuery.order = 'latest_last_message';
    this.listQuery.limit = 15;
    if (this.listQuery.hasNext) {
      await this.listQuery.next((groupChannel:any, error:any)=>{
        channel = groupChannel
      });
    }
    return channel
  }

  getMessagesFromChannel(groupChannel: SendBird.GroupChannel) {
    const listQuery = groupChannel.createPreviousMessageListQuery();
    listQuery.limit = 10;
    listQuery.includeMetaArray = true;
    listQuery.load((messages, error) => {
      console.log(messages)
    });
  }
}
