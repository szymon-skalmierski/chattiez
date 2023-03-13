import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';

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
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
