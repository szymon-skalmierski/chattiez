import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  host: {
    class: 'chat-component',
  },
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
  }

}
