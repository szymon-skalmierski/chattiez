import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth.service';
import { SignInWithPasswordResponse } from '../firebase-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  connectionError = new BehaviorSubject<string | null>(null);
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

    this.authService.login(email, password).subscribe({
      next: (res: SignInWithPasswordResponse) => {
        console.log(res);
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
