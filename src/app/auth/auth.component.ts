import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
 
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.navigate(['login'], { relativeTo: this.route })
  }
}
