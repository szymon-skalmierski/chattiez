import { Injectable } from '@angular/core';
import * as SendBird from 'sendbird';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

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
