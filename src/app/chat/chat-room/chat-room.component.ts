import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as SendBird from 'sendbird';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  channel!: SendBird.GroupChannel | any;
  messages: any[] = [];
  groupUrl: any;
  limit = 15;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.groupUrl = params['url'];
      this.authService.sb.GroupChannel.getChannel(this.groupUrl).then(
        (channel: any) => {
          if(channel){
            this.channel = channel;
            this.reloadMsg(this.limit);
          }
        }
      );
    });
    this.chatService.registerEventHandlers(this.messages);
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

  reloadMsg(limit: any) {
    this.getMessagesFromChannel(
      this.channel,
      limit,
      (messages:any)=>this.messages = messages
    );
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

  leaveChat(channel: SendBird.GroupChannel){
      channel.leave().then(()=>{
        this.chatService.getMyGroupChannels();
      });
  }

  getUserId() {
    return this.authService.getConnectedUserId();
  }

  handleSendForm(form: any){
    if(!form.valid) return;
    const message = form.value.message;
    this.sendMessage(this.channel, message, (msg: any) => {
      this.messages.unshift(msg);
    });
    form.reset();
  }

  onMessageDelete(channel:SendBird.GroupChannel | SendBird.OpenChannel, message:SendBird.UserMessage){
    channel.deleteMessage(message, ()=>{
      this.reloadMsg(this.limit);
    })
  }

  
  trackById(index: number, item: any): number {
    return item.messageId;
  }
}
