import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  public currentHref: string = '';
  isLoggedIn = false;
  currentUserSubject: BehaviorSubject<User>;
  currentUserId: string = '';
  isAdmin: boolean = false;

  constructor(
    location: Location,
    public authService: SocialAuthService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.currentHref = location.path();
      } else {
        this.currentHref = 'Home';
      }
    });
  }
  ngOnInit(): void {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserId = this.currentUserSubject.value.id;
    this.isLoggedIn = !!this.currentUserSubject.value.id;
    if (this.currentUserSubject.value.role.includes('ADMIN')) {
      this.isAdmin = true;
    }
  }
  toggleIcon: boolean = true;

  toggleLoveIcon() {
    this.toggleIcon = !this.toggleIcon;
  }

  dashboardArray = [
    '/admin',
    '/admin/index',
    '/admin/my-wallets',
    '/admin/transactions',
    '/admin/coin-details',
    '/admin/portofolio',
    '/admin/market-capital',
  ];

  apsArray=['/admin',
  '/admin/index',
  ,]

  pluginsArray = ['/admin/uc-nestable', '/admin/uc-lightgallery'];

  formsArray = ['/admin/form-element', '/admin/form-validate'];
}
