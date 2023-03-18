import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  { path: '', component: ChatComponent, children: [
    { path: ':url', component: ChatRoomComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
