import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

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
    this.authService.signup(email, password).subscribe(
      (res)=>{
        console.log(res);
        this.authService.updateUsername(res.localId, username).subscribe(
          (data)=>console.log(data)
        );
      }
    );
  }
}
