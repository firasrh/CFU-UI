import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  isLoggedIn = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private notification: NotificationService,
    private authenticationService: AuthService
  ) {}
  async canActivate() {
    let currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    if (currentUser && currentUser.accessToken) {
      return true;
    } else {
      this.router.navigate(['Error401']);
      this.notification.showError('You should to login first', 'Unauthorized');

      return false;
    }
  }
}
