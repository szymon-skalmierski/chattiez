import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  listQuery: any;

  constructor(private authService: AuthService) {
    this.listQuery =
      this.authService.sb.GroupChannel.createMyGroupChannelListQuery();
  }

  getMyGroupChannels(callback: Function) {
    this.listQuery.includeEmpty = true;
    this.listQuery.memberStateFilter = 'joined_only';
    this.listQuery.order = 'latest_last_message';
    this.listQuery.limit = 15;
    if (this.listQuery.hasNext) {
      this.listQuery.next((groupChannel: any, error: any) => {
        callback(groupChannel);
      });
    }
  }

  getMessagesFromChannel(
    groupChannel: SendBird.GroupChannel,
    limit: number,
    callback: Function
  ) {
    const listQuery = groupChannel.createPreviousMessageListQuery();
    listQuery.reverse = true;
    listQuery.limit = limit;
    listQuery.includeMetaArray = true;
    listQuery.load((messages, error) => {
      callback(messages);
    });
  }

  sendMessage(
    channel: SendBird.GroupChannel | SendBird.OpenChannel,
    message: string,
    callback: any
  ) {
    const params = new this.authService.sb.UserMessageParams();
    params.message = message;
    channel.sendUserMessage(params, (userMessage, error) => {
      callback(userMessage);
    });
  }
}
