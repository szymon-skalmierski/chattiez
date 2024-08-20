import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChatService } from '../chat.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-room-create',
  templateUrl: './chat-room-create.component.html',
  styleUrls: ['./chat-room-create.component.css']
})
export class ChatRoomCreateComponent {
  groupUsersAdded: any[] = [];

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.authService.user.subscribe({
      next:(user)=>{
        this.groupUsersAdded.push(user?.username)
      }
    })
    this.chatService.getMyGroupChannels();
  }

  addUserToGroup(channelForm: NgForm){
    const username = channelForm.value['userId'];
    if(username != "" && this.groupUsersAdded.indexOf(username)==-1) {
      this.groupUsersAdded.push(username);
    }
  }

  onChannelCreate(channelForm: NgForm){
    const channelName = channelForm.value['channelName'];
    this.chatService.createGroupChannel(channelName, this.groupUsersAdded, 
      (groupChannel: SendBird.GroupChannel, error: SendBird.SendBirdError)=>{
        this.chatService.getMyGroupChannels();
        this.router.navigate([groupChannel.url], {relativeTo: this.route})
      });
    this.groupUsersAdded = [this.authService.user.value?.username];
    channelForm.reset();
  }

  removeUserFromGroup(userId: string) {
    this.groupUsersAdded.splice(this.groupUsersAdded.indexOf(userId), 1);
  }
}
