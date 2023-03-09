import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  authType = 'login';
  connectionError = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('type') != 'login' && params.get('type') != 'signup') {
        this.router.navigate(['/auth/login']);
      } else {
        this.authType = params.get('type') || 'login';
      }
    });
  }

  checkIfLoggedIn(){
    if(localStorage.getItem('userData')){
      this.router.navigate(['/chat']);
    }
  }

  login(userid:any, token:any){
    this.authService.connect(userid, token);
  }

  logout(){
    this.authService.logout();
  }

  // getUserFromServer(userId: any, token: any) {
  //   this.authService.connect(userId, token, (user: any, error: any) => {
  //     if (error) {
  //       this.connectionError = error.message;
  //     }
  //     this.router.navigate(['/']);
  //     localStorage.setItem('userData', JSON.stringify({userId: userId, token: token}));
  //   });
  // }


}
