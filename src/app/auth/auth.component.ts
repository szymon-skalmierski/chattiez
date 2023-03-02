import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authType = 'login';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('type') != 'login' && params.get('type') != 'signup') {
        this.router.navigate(['/auth/login']);
      } else {
        this.authType = params.get('type') || 'login';
      }
    })
  }
}
