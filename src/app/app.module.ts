import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthComponent } from './auth/auth.component';
import { ChatModule } from './chat/chat.module';
import { ChatGuard } from './chat/chat.guard';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AuthComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ChatModule,
    CommonModule,
  ],
  providers: [ChatGuard, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
