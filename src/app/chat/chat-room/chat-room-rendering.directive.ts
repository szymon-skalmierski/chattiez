import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

import * as SendBird from 'sendbird';

import { ChatRoomService } from './chat-room.service';

@Directive({
  selector: '[appChatRoomRendering]',
})
export class ChatRoomRenderingDirective implements OnInit {
  @HostBinding('class.scrolled') scrolled = false;
  @Input() queryList!: SendBird.PreviousMessageListQuery;
  latestMsgUpdate = new Date().getTime();
  scrollPos = 0;

  @HostListener('scroll', ['$event']) scrollEnd(eventData: Event) {
    const chatEl = eventData.target as HTMLDivElement;
    const lastReloadTimeDiff = new Date().getTime() - this.latestMsgUpdate;
    this.scrollPos = chatEl.scrollTop - chatEl.clientHeight + chatEl.scrollHeight;

    if (this.scrollPos <= 1 && lastReloadTimeDiff > 100) {
      this.latestMsgUpdate = new Date().getTime();
      this.chatRoomService.getMessagesFromChannel(
        this.queryList,
        10,
        (messages: any) => {
          this.chatRoomService.messages.push(messages);
          this.chatRoomService.messagesChanged.next(true);
          this.scrolled = true;
        }
      );
    }
  }

  constructor(private chatRoomService: ChatRoomService) {}
  ngOnInit(): void {}
}
