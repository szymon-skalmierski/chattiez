import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SendBirdError } from 'sendbird';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  connectionError: any = new BehaviorSubject(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.authError.subscribe((error: SendBirdError)=>{
      this.connectionError.next(error);
    })
  }

  logout() {
    this.authService.logout();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    const connection = this.authService.login(email, password);
    connection.subscribe((res: any) => {
      this.authService.connect(res.displayName, res.idToken).then(() => {
        this.router.navigate(['/chat']);
      });
    });
  }
}
