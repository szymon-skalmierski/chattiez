import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as SendBird from 'sendbird';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  host: {
    class: 'chat-component',
  },
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {
  channels: any


  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.onClicked()
  }

  async onClicked(){
    this.channels = await this.chatService.getMyGroupChannels()
    this.c()
  }

  c(){
    console.log(this.channels)
  }
}
