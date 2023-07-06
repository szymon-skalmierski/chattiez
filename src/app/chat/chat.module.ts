import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { ChatRoomRenderingDirective } from './chat-room/chat-room-rendering.directive';
import { ChatRoomMessageComponent } from './chat-room/chat-room-message/chat-room-message.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomListComponent,
    ChatRoomComponent,
    ChatRoomRenderingDirective,
    ChatRoomMessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    HttpClientModule,
  ]
})
export class ChatModule { }
