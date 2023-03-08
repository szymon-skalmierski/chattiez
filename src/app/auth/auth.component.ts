import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

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
      this.checkIfLoggedIn();
    });
  }
  checkIfLoggedIn(){
    if(localStorage.getItem('username') && localStorage.getItem('token')){
      this.router.navigate(['/chat']);
    }
  }
  getUserFromServer(userId: any, token: any) {
    this.authService.connect(userId, token, (user: any, error: any) => {
      if (!!error) {
        this.connectionError = error.message;
      }
      this.router.navigate(['/']);
      localStorage.setItem('username', userId);
      localStorage.setItem('token', token);
    });
  }
}
