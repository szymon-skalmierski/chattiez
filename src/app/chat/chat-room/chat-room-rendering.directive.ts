import { Directive, HostListener, OnInit } from '@angular/core';
import { ChatRoomComponent } from './chat-room.component';

@Directive({
  selector: '[appChatRoomRendering]',
})
export class ChatRoomRenderingDirective implements OnInit {
  @HostListener('scroll', ['$event']) scrollEnd(eventData: Event) {
    const chatEl = (eventData.target as HTMLDivElement);
    if(chatEl.scrollTop === chatEl.clientHeight - chatEl.scrollHeight){
      this.chat.reloadMsg(20)
    }
  }

  constructor(private chat: ChatRoomComponent) {}
  ngOnInit(): void {}
}
 