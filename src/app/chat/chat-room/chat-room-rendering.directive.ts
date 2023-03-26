import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';
import { ChatRoomComponent } from './chat-room.component';

@Directive({
  selector: '[appChatRoomRendering]',
})
export class ChatRoomRenderingDirective implements OnInit {
  msgLimit: number = 15
  @HostBinding('scrollTop') scrollTop = 0
  @HostListener('scroll', ['$event']) scrollEnd(eventData: Event) {
    const chatEl = (eventData.target as HTMLDivElement);
    if(chatEl.scrollTop === chatEl.clientHeight - chatEl.scrollHeight){
        this.chat.reloadMsg(this.msgLimit+=10);
    }
  }

  constructor(private chat: ChatRoomComponent) {}
  ngOnInit(): void {}
}
 