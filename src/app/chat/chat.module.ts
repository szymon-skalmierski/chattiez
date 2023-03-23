import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatRoomRenderingDirective } from './chat-room/chat-room-rendering.directive';


@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomListComponent,
    ChatRoomComponent,
    ChatRoomRenderingDirective
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    HttpClientModule
  ]
})
export class ChatModule { }
