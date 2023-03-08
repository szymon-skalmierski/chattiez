import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-chat';
  constructor(private authService: AuthService){
  }
  ngOnInit(){
    if(localStorage.getItem('username')){
      this.authService.connect(localStorage.getItem('username')!, localStorage.getItem('token'), ()=>{})
    }
  }

  getStatus(){
    return this.authService.loggedIn;
  }
  
  getUsername(){
    return this.authService.getConnectedUser()?.nickname
  }

  signout(){
    this.authService.signout();
  }
}
