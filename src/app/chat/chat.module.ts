import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomListComponent,
    ChatRoomComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    HttpClientModule
  ]
})
export class ChatModule { }
