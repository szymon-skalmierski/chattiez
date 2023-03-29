import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
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
  groupUsersAdded: any[] = []

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe({
        next:(user)=>{
          this.groupUsersAdded.push(user?.userId)
        }
      })
    this.chatService.getMyGroupChannels();
  }

  addUserToGroup(channelForm: NgForm){
    const userId = channelForm.value['userId'];
    this.groupUsersAdded.push(userId);
  }

  onChannelCreate(channelForm: NgForm){
    const channelName = channelForm.value['channelName'];
    this.chatService.createGroupChannel(channelName, this.groupUsersAdded, ()=>{this.chatService.getMyGroupChannels();});
    this.groupUsersAdded = [];
    channelForm.reset();
  }
}
