import { Injectable,  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as SendBird from 'sendbird';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  chatGroups = new BehaviorSubject<SendBird.GroupChannelCollection | null>(null);
  channelHandler = new this.authService.sb.ChannelHandler();

  constructor(private authService: AuthService) {
  }

  getMyGroupChannels() {
    const listQuery = this.authService.sb.GroupChannel.createMyGroupChannelListQuery();
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
      console.log(messages)
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
    this.channelHandler.onChannelDeleted = ()=>{
      this.getMyGroupChannels();
    }

    this.authService.sb.addChannelHandler('6f688da4e9a446de', this.channelHandler);

  }

  createGroupChannel(
    channelName: string,
    userIds: Array<string>,
    callback: any
  ) {
    const params = new this.authService.sb.GroupChannelParams();
    params.addUserIds(userIds);
    params.name = channelName;
    this.authService.sb.GroupChannel.createChannel(
      params,
      (groupChannel: SendBird.GroupChannel, error: SendBird.SendBirdError) => {
        callback(error, groupChannel);
      }
    );
    }
}
