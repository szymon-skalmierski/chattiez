import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-chat';
  isConnected: BehaviorSubject<boolean>
  user!: Subscription
  
  constructor(private authService: AuthService){
    this.authService.autoLogin();
    this.isConnected = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(){
    this.user = this.authService.user.subscribe((user:any)=>{
      if(user) this.isConnected.next(true)
      else this.isConnected.next(false)
    })
  }

  logout(){
    this.authService.logout()
  }

  getUsername(){
    return this.authService.getConnectedUser()?.nickname
  }
}
