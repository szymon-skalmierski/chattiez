import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isConnected = new BehaviorSubject<boolean>(false);
  userSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user: any) => {
      if (user) this.isConnected.next(true);
      else this.isConnected.next(false);
    });
  }

  logout() {
    this.authService.logout();
  }

  getUsername() {
    return this.authService.getConnectedUser()?.nickname || this.authService.getConnectedUser()?.userId;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
