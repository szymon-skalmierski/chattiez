import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { exhaustMap, throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    const email = form.controls['email'].value;
    const username = form.controls['username'].value;
    const password = form.controls['password'].value;
    this.authService
      .getUsernames()
      .pipe(
        exhaustMap((res) => {
          const usernames = Object.values(res);
          if (usernames.indexOf(username) !== -1) {
            return throwError(() => new Error('This username is taken.'));
          }
          return this.authService.signup(email, password).pipe(
            exhaustMap((res) => {
              return this.authService.updateUsername(res.localId, username);
            })
          );
        })
      )
      .subscribe({ error: (err) => console.log(err) });
  }
}
