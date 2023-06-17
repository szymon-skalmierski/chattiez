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

  logout() {
    this.authService.logout();
  }

  onSubmit(form: NgForm) {
    if(!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    
    if (this.authType === 'login') {
      const connection = this.authService.login(email, password);
      connection.subscribe((res: any)=>{
        this.authService.connect(res.displayName, res.idToken).then(()=>{
          this.router.navigate(['/chat'])
        })
      })
    }
  }
}
