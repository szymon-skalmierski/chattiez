import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appChatRoomRendering]',
})
export class ChatRoomRenderingDirective implements OnInit {
  @HostListener('scroll', ['$event']) scrollEnd(eventData: Event) {
    if ((eventData.target as HTMLDivElement).scrollTop === -((eventData.target as HTMLDivElement).scrollHeight - (eventData.target as HTMLDivElement).clientHeight)){
        console.log('koniec scrollowania');
    }
  }

  constructor() {}
  ngOnInit(): void {}
}
