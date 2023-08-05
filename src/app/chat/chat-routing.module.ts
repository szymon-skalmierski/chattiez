import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatGuard } from './chat.guard';
import { ChatComponent } from './chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [ChatGuard],
    children: [
      { path: ':url', component: ChatRoomComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
