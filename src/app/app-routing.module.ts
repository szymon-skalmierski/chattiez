import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ChatGuard } from './chat/chat.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth/:type',
    component: AuthComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    canActivate: [ChatGuard],
    loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
  },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
