import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUserId: string = '';
  isLoggedIn = false;
  constructor(
    public authService: SocialAuthService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserId = this.currentUserSubject.value.id;
    this.isLoggedIn = !!this.currentUserSubject.value.id;
  }
  news = [
    {
      image: 'assets/images/profile/5.jpg',
      title: 'Collection of textile samples',
      description:
        'I shared this on my fb wall a few months back, and I thought.',
      url: 'admin/post-details',
    },
    {
      image: 'assets/images/profile/6.jpg',
      title: 'Collection of textile samples',
      description:
        'I shared this on my fb wall a few months back, and I thought.',
      url: 'admin/post-details',
    },
    {
      image: 'assets/images/profile/7.jpg',
      title: 'Collection of textile samples',
      description:
        'I shared this on my fb wall a few months back, and I thought.',
      url: 'admin/post-details',
    },
  ];

  open(modelId: any) {
    this.modalService.open(modelId);
  }
}
