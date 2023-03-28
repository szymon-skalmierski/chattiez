import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  }

  addUserToGroup(userId:any){
    this.groupUsersAdded.push(userId.value);
  }

}
