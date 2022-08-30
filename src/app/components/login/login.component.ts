import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  angForm: FormGroup | any;

  constructor(
    public authService: AuthService,
    public socialAuthService: SocialAuthService,
    public notification: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {this.createForm();}

  ngOnInit() {}

  createForm() {
    this.angForm = this.fb.group({
      email: ['', [Validators.required ,  Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)] ],
		
       
    });
  }
  toggleEye: boolean = true;
  
  toggleEyeIcon(inputPassword:any) {
		this.toggleEye = !this.toggleEye;
		
		inputPassword.type = inputPassword.type === 'password' ? 'text' : 'password';

		
	}

  facebookSignin(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.authService.socialLogin(user.email).subscribe({
          next: (data) => {
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.notification.showSuccess('Welcome', '');
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            //this.errorMessage = err.error.message;
            this.notification.showError('You have to register', '');
            this.isLoginFailed = true;
          },
        });
      });
  }
  googleSignin(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.authService.socialLogin(user.email).subscribe({
          next: (data) => {
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.notification.showSuccess('Welcome', '');
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            //this.errorMessage = err.error.message;
            this.notification.showError('You have to register', '');
            this.isLoginFailed = true;
          },
        });
      });
  }

  onSubmit(): void {
    let email= this.angForm.get(["email"]).value
    let password =this.angForm.get(["password"]).value

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log(data.role);
        if (data.role.includes('ADMIN')) {
          this.router.navigate(['BoardAdmin']);
        } else {
          this.router.navigate(['dashboard']);
        }
      },
      error: (err) => {
        if(err.status=="401"){
          this.notification.showError('Check your details please .. ', '');
        }else{
          this.notification.showError('You have to register', '');
        }
            
            this.isLoginFailed = true;
      },
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
