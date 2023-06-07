import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { ChatRoomService } from './chat-room.service';
import * as SendBird from 'sendbird';

@Directive({
  selector: '[appChatRoomRendering]',
})
export class ChatRoomRenderingDirective implements OnInit {
  @Input() channel!: SendBird.GroupChannel 
  latestMsgUpdate = new Date().getTime()
  scrollPos = 0

  @HostListener('scroll', ['$event']) scrollEnd(eventData: Event) {
    const chatEl = (eventData.target as HTMLDivElement); 
    const lastReloadTimeDiff = new Date().getTime() - this.latestMsgUpdate
    this.scrollPos = chatEl.scrollTop - chatEl.clientHeight+chatEl.scrollHeight

    if(this.scrollPos <=1 && lastReloadTimeDiff > 100){
      this.latestMsgUpdate = new Date().getTime()
      this.chatRoomService.getMessagesFromChannel(this.channel, this.chatRoomService.limit+=8, (messages: any)=>{
        this.chatRoomService.messages = messages;
      });
    }
  }

  constructor(private chatRoomService: ChatRoomService) {}
  ngOnInit(): void {}
}
 