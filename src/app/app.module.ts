import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ChatGuard } from './chat/chat.guard';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [ChatGuard, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
