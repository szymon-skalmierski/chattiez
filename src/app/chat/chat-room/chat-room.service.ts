import { Injectable } from '@angular/core';
import * as SendBird from 'sendbird';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  messages: any[] = [];
  limit = 15;

  constructor() { }

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

  setFetchedChannels(groupChannel:any, limit:number){
    this.getMessagesFromChannel(groupChannel, limit, (messages: any)=>{
      this.messages = messages;
    })
  }

  sendMessage(
    channel: SendBird.GroupChannel | SendBird.OpenChannel,
    message: string,
    user: SendBird.SendBirdInstance,
    callback: any
  ) {
    const params = new user.UserMessageParams();
    params.message = message;
    channel.sendUserMessage(params, (userMessage, error) => {
      callback(userMessage);
    });
  }
}
