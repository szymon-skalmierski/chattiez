import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  msgInterval: any
  channel: any
  messages: any
  groupUrl: any

  constructor(private route: ActivatedRoute, private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.groupUrl = params['url'];
      this.authService.sb.GroupChannel.getChannel(this.groupUrl).then((channel:any)=>{
        this.channel = channel
        this.chatService.getMessagesFromChannel(channel, (messages:any)=>{this.messages = messages; console.log(messages)})
        // this.msgInterval = setInterval(()=>{
        //   this.chatService.getMessagesFromChannel(channel, (messages:any)=>this.messages = messages)
        // }, 1000)
      });
      clearInterval(this.msgInterval);
    });
  }

  getUserId(){
    return this.authService.isConnected();
  }

  sendMsg(channel:any, msg:any){
    this.chatService.sendMessage(channel, msg, (msg:any)=>{console.log(msg)});
  }
}
