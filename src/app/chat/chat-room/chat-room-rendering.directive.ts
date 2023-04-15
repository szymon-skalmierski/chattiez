import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';
import { ChatRoomComponent } from './chat-room.component';

@Directive({
  selector: '[appChatRoomRendering]',
})
export class ChatRoomRenderingDirective implements OnInit {
  msgLimit: number = 15
  latestMsgUpdate = new Date().getTime()
  scrollPos = 0

  @HostListener('scroll', ['$event']) scrollEnd(eventData: Event) {
    const chatEl = (eventData.target as HTMLDivElement); 
    const lastReloadTimeDiff = new Date().getTime() - this.latestMsgUpdate
    this.scrollPos = chatEl.scrollTop - chatEl.clientHeight+chatEl.scrollHeight

    if(this.scrollPos <=1 && lastReloadTimeDiff > 100){
      this.latestMsgUpdate = new Date().getTime()
      this.chat.reloadMsg(this.msgLimit+=8);
    }
  }

  constructor(private chat: ChatRoomComponent) {}
  ngOnInit(): void {}
}
 