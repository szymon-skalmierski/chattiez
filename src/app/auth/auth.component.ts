import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { SendBirdError } from 'sendbird';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authType = 'login';
  connectionError: any = new BehaviorSubject(null);
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

    this.authService.authError.subscribe((error: SendBirdError)=>{
      this.connectionError.next(error);
    })
  }

  login(userid: any, token: any) {
    this.authService.connect(userid, token);
  }

  logout() {
    this.authService.logout();
  }

  onSubmit(form: NgForm) {
    if(!form.valid) return;
    const email = form.value.userId;
    const accessToken = form.value.accessToken;
    
    if (this.authType === 'login') {
      const connection = this.authService.connect1(email, accessToken);
      connection.subscribe((res: any)=>{
        this.authService.connect(res.displayName, '').then(()=>{
          console.log('successful logged in')
          this.router.navigate(['/chat'])
        })
      })
    }
  }
}
