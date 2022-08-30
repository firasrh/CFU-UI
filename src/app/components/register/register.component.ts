import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user!: SocialUser;
  isSignedin: boolean = null;
  message: String;
  password: string;
  angForm: FormGroup | any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private socialAuthService: SocialAuthService,
    public authService: AuthService,
    public notification: NotificationService,
    public router: Router,
    private fb: FormBuilder
  ) {this.createForm();}

  ngOnInit() {}

  createForm() {
    this.angForm = this.fb.group({
      firstName: ['', [Validators.required ,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20),Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required ,  Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)] ],
		
       
    });
  }
  
  
  
  toggleEye: boolean = true;
  
  toggleEyeIcon(inputPassword:any) {
		this.toggleEye = !this.toggleEye;
		
		inputPassword.type = inputPassword.type === 'password' ? 'text' : 'password';

		
	}

  generatePassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  facebookSignUp(): void {
    this.password = this.generatePassword();
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.authService
          .register(
            user.firstName,
            user.lastName,
            user.email,
            this.password,
            false,
            user.authToken,
            user.response.picture.data.url
          )
          .subscribe({
            next: (data) => {},
            error: (err) => {
              if (err.error.status == '500') {
                this.notification.showError(err.error.message, '');
                this.router.navigate(['login']);
                console.log(err);
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
                console.log(this.isSignUpFailed);
              } else {
                if (err.status == '200') {
                  this.notification.showSuccess(
                    'You have successfully registered',
                    ''
                  );
                  this.router.navigate(['login']);
                  this.isSignUpFailed = false;
                  console.log(this.isSignUpFailed);
                } else {
                  this.notification.showSuccess(err.error.message, '');
                  this.router.navigate(['login']);
                  this.isSignUpFailed = true;
                  console.log(this.isSignUpFailed);
                }
              }
            },
          });
      })
      .then(() => {
        this.socialAuthService.signOut();
      });
  }

  GoogleSignUp(): void {
    this.password = this.generatePassword();
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.authService
          .register(
            user.firstName,
            user.lastName,
            user.email,
            this.password,
            false,
            user.authToken,
            user.photoUrl
          )
          .subscribe({
            next: (data) => {},
            error: (err) => {
              if (err.error.status == '500') {
                this.notification.showError(err.error.message, '');
                this.router.navigate(['login']);
                console.log(err);
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
                console.log(this.isSignUpFailed);
              } else {
                if (err.status == '200') {
                  this.notification.showSuccess(
                    'You have successfully registered',
                    ''
                  );
                  this.router.navigate(['login']);
                  this.isSignUpFailed = false;
                  console.log(this.isSignUpFailed);
                } else {
                  this.notification.showSuccess(err.error.message, '');
                  this.router.navigate(['login']);
                  this.isSignUpFailed = true;
                  console.log(this.isSignUpFailed);
                }
              }
            },
          });
      })
      .then(() => {
        this.socialAuthService.signOut();
      });
  }

  onSubmit(): void {
    let firstName= this.angForm.get(["firstName"]).value
    let lastName= this.angForm.get(["lastName"]).value
    let email= this.angForm.get(["email"]).value
    let password =this.angForm.get(["password"]).value

    this.authService
      .register(firstName, lastName, email, password, false, '', '')
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.error.status == '500') {
            this.notification.showError(err.error.message, '');
            this.router.navigate(['login']);
            console.log(err);
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
            console.log(this.isSignUpFailed);
          } else {
            if (err.status == '200') {
              this.notification.showSuccess(
                'You have successfully registered',
                ''
              );
              this.router.navigate(['login']);
              this.isSignUpFailed = false;
              console.log(this.isSignUpFailed);
            } else {
              this.notification.showSuccess(err.error.message, '');
              this.router.navigate(['login']);
              this.isSignUpFailed = true;
              console.log(this.isSignUpFailed);
            }
          }
        },
      });
  }
}
