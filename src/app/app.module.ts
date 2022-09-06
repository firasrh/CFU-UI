import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, authInterceptorProviders } from './helpers/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SwiperModule } from 'swiper/angular';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { GraphMarketOverviewComponent } from './components/graph-market-overview/graph-market-overview.component';
import { GraphCurrentStatisticComponent } from './components/graph-current-statistic/graph-current-statistic.component';
import { BuyOrderComponent } from './components/buy-order/buy-order.component';
import { SellOrderComponent } from './components/sell-order/sell-order.component';
import { QuickTradeComponent } from './components/quick-trade/quick-trade.component';
import { RecentTradingActivitiesComponent } from './components/recent-trading-activities/recent-trading-activities.component';
import { QuickTransferCrousalComponent } from './components/quick-transfer-crousal/quick-transfer-crousal.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { SharedService } from './shared.service';
import { CarouselComponent } from './components/bootstrap/carousel/carousel.component';
import { CarouselBasicComponent } from './components/bootstrap/carousel/carousel-basic/carousel-basic.component';
import { CarouselConfigComponent } from './components/bootstrap/carousel/carousel-config/carousel-config.component';
import { CarouselNavigationComponent } from './components/bootstrap/carousel/carousel-navigation/carousel-navigation.component';
import { CarouselPauseComponent } from './components/bootstrap/carousel/carousel-pause/carousel-pause.component';
import { PortofolioComponent } from './components/portofolio/portofolio.component';
import { CurrentGraph1Component } from './components/current-graph1/current-graph1.component';
import { CurrentGraph2Component } from './components/current-graph2/current-graph2.component';
import { MyActivityComponent } from './components/my-activity/my-activity.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { Error401Component } from './components/error401/error401.component';
import { CoinDetailsComponent } from './components/coin-details/coin-details.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AllPortofoliosComponent } from './components/all-portofolios/all-portofolios.component';
import { UpdateTransactionComponent } from './components/update-transaction/update-transaction.component';
import { AuthService } from './services/auth.service';
import { GoogleInterestComponent } from './components/google-interest/google-interest.component';
import { IntersetOverTimeComponent } from './components/google-interest/interset-over-time/interset-over-time.component';
import { DatePipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


const CLIENT_ID = environment.client_Id;
const CLIENT_ID_GOOLE = environment.client_Id_Google;
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    HeaderComponent,
    ProfileComponent,
    GraphMarketOverviewComponent,
    GraphCurrentStatisticComponent,
    BuyOrderComponent,
    SellOrderComponent,
    QuickTradeComponent,
    RecentTradingActivitiesComponent,
    QuickTransferCrousalComponent,
    FooterComponent,
    NavHeaderComponent,
    CarouselComponent,
    CarouselBasicComponent,
    CarouselConfigComponent,
    CarouselNavigationComponent,
    CarouselPauseComponent,
    BoardAdminComponent,
    PortofolioComponent,
    CurrentGraph1Component,
    CurrentGraph2Component,
    MyActivityComponent,
    MyProfileComponent,
    Error401Component,
    CoinDetailsComponent,
    AddTransactionComponent,
    TransactionsComponent,
    AllPortofoliosComponent,
    UpdateTransactionComponent,
    GoogleInterestComponent,
    IntersetOverTimeComponent,
    SocialMediaComponent,
    PredictionComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    PerfectScrollbarModule,
    NgbModule,
    NgApexchartsModule,
    CarouselModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    DragDropModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
    MatTreeModule,
    MatInputModule,
    Ng2SearchPipeModule,
    NgChartsModule,
    SlickCarouselModule,
    SwiperModule
    
  ],
  providers: [
    SharedService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              CLIENT_ID
            )
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID_GOOLE
            )
          }
        ]
      } as SocialAuthServiceConfig,

    },
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    DatePipe
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
