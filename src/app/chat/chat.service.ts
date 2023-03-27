import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ChatService{
  channelHandler = new this.authService.sb.ChannelHandler();

  constructor(private authService: AuthService) {
  }

  getMyGroupChannels(callback: Function) {
    const listQuery = this.authService.sb.GroupChannel.createMyGroupChannelListQuery();
    listQuery.includeEmpty = true;
    listQuery.memberStateFilter = 'joined_only';
    listQuery.order = 'latest_last_message';
    listQuery.limit = 15;
    if (listQuery.hasNext) {
      listQuery.next((groupChannel: any, error: any) => {
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
  
  registerEventHandlers(messagesList:any){
    this.channelHandler.onMessageReceived = (channel, message) => {
      messagesList.unshift(message)
    };

    this.authService.sb.addChannelHandler('6f688da4e9a446de', this.channelHandler);
  }
}
