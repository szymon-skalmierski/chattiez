import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-chat';
  
  constructor(private authService: AuthService){
    this.authService.autoLogin()
  }

  logout(){
    this.authService.logout()
  }
}
