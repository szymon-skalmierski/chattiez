import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  connectionError: any = new BehaviorSubject(null);
  submitted = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.connectionError.next(null);
    const email = form.value.email;
    const password = form.value.password;

    const connection = this.authService.login(email, password);
    connection.subscribe({
      next: (res: any) => {
        this.authService.connect(res.displayName, res.idToken).then(() => {
          this.router.navigate(['/chat']);
        });
      },
      error: (err) => {
        let errorMsg = '';
        switch (err.error.error.message) {
          case 'EMAIL_NOT_FOUND':
          case 'INVALID_EMAIL':
            errorMsg = 'This email is invalid';
            break;
          case 'INVALID_PASSWORD':
            errorMsg = 'This password is invalid';
            break;
          default:
            errorMsg = 'Some error occurred';
            break;
        }
        this.connectionError.next(errorMsg);
      },
    });
  }
}
