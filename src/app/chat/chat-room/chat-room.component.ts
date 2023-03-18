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
      this.channel = this.authService.sb.GroupChannel.getChannel(this.groupUrl);
      clearInterval(this.msgInterval)
      this.channel.then((channel:any)=>{
        this.chatService.getMessagesFromChannel(channel, (messages:any)=>this.messages = messages)
        this.msgInterval = setInterval(()=>{
          this.chatService.getMessagesFromChannel(channel, (messages:any)=>this.messages = messages)
        }, 1000)
      })
    });
  }

}
