import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { PortofolioComponent } from './components/portofolio/portofolio.component';
import { Error401Component } from './components/error401/error401.component';
import { CoinDetailsComponent } from './components/coin-details/coin-details.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AllPortofoliosComponent } from './components/all-portofolios/all-portofolios.component';
import { GoogleInterestComponent } from './components/google-interest/google-interest.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
      canActivate: [AuthGuard],
  },
  {
    path: 'portfolios',
    component: AllPortofoliosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'portfolio/:id',
    component: PortofolioComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'BoardAdmin',
    component: BoardAdminComponent,
   canActivate: [AuthGuard],
  },
  { path: 'Error401', component: Error401Component },
  {
    path: 'CoinDetails/:id',
    component: CoinDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Add-transaction',
    component: AddTransactionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transactions/:id',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'googleT',
    component: GoogleInterestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'socialMedia',
    component: SocialMediaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'prediction',
    component: PredictionComponent,
    canActivate: [AuthGuard],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
