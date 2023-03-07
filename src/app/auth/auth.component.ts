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
    });
  }
  getUserFromServer(userId: any, token: any) {
    this.authService.connect(userId, token, (user: any, error: any) => {
      if (error) {
        this.connectionError = true;
      } else {
        this.connectionError = false;
      }
      if(!error){
        this.authService.loggedIn = true;
        this.router.navigate(['/chat'])
      }
    });
  }
  a() {
    console.log('asdfasdf');
  }
}
