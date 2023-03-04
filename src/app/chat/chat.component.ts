import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  host: {
    class:'chat-component'
  },
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
