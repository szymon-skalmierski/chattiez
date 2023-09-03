import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {
  BehaviorSubject,
  exhaustMap,
  take,
  throwError,
} from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  takenUsernames!: string[] | null;
  signupError = new BehaviorSubject<string | null>(null);
  signupSuccess = new BehaviorSubject<string | null>(null);
  submitted = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        take(1),
      )
      .subscribe((data: any) => {
        this.takenUsernames = [...Object.values<string>(data[0])];
        console.log(this.takenUsernames);
      });
  }

  onSignup(form: NgForm) {
    if (!form.valid) {
      this.submitted = false;
      return;
    }

    if (
      form.controls['password'].value !==
      form.controls['confirm_password'].value
    ) {
      this.submitted = false;
      this.signupError.next('Passwords are not the same');
      return;
    }

    if (this.takenUsernames === null) {
      this.submitted = false;
      this.signupError.next('There is a problem with server connection');
      return;
    }

    this.submitted = true;
    const email = form.controls['email'].value;
    const username = form.controls['username'].value;
    const password = form.controls['password'].value;

    if (this.takenUsernames.indexOf(username) !== -1) {
      return throwError(() => 'This username is taken');
    }
    return this.authService.signup(email, password).pipe(
      exhaustMap((res) => {
        this.takenUsernames?.push(email);
        return this.authService.updateUsername(res.localId, username);
      })
    ).subscribe({
      next: () => {
        this.signupError.next(null);
        this.signupSuccess.next("You've successfully signed in!");
        this.submitted = false;
      },
      error: (err) => {
        this.signupError.next(err);
        this.signupSuccess.next(null);
        this.submitted = false;
      },
    });
  }
}
