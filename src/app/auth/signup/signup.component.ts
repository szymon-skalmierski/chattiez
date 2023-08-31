import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, exhaustMap, throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupError = new BehaviorSubject<string | null>(null);
  submitted = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (!form.valid) {
      this.submitted = false;
      return;
    }

    if (form.controls['password'].value !== form.controls['confirm_password'].value) {
      this.submitted = false;
      this.signupError.next('Passwords are not the same');
      return;
    }

    this.submitted = true;
    const email = form.controls['email'].value;
    const username = form.controls['username'].value;
    const password = form.controls['password'].value;
    this.authService
      .getUsernames()
      .pipe(
        exhaustMap((res) => {
          const usernames = Object.values(res);
          if (usernames.indexOf(username) !== -1) {
            return throwError(() => 'This username is taken');
          }
          return this.authService.signup(email, password).pipe(
            exhaustMap((res) => {
              return this.authService.updateUsername(res.localId, username);
            })
          );
        })
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.signupError.next(err);
          this.submitted = false;
        },
      });
  }
}
