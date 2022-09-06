import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { CoinService } from 'src/app/services/coin.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import SwiperCore, {  Scrollbar, Mousewheel } from 'swiper';
SwiperCore.use([Scrollbar]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  @Input() data:any;
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 1,  prevArrow:"<img class='a-left control-c prev slick-prev' src='../../../assets/images/nav-icon-left.png'>",
  nextArrow:"<img class='a-right control-c next slick-next' src='../../../assets/images/nav-icon-right.png'>"  , 
  "infinite": false};
  slideConfig2 = {"slidesToShow": 2, "slidesToScroll": 1,  prevArrow:"<img class='a-left control-c prev slick-prev' src='../../../assets/images/nav-icon-left.png'>",
  nextArrow:"<img class='a-right control-c next slick-next' src='../../../assets/images/nav-icon-right.png'>"  , 
  "infinite": false};
  TrendingCoins: any = [];
  currency: string = 'USD';
  portfolios: any = [];
  currentUserSubject: BehaviorSubject<User>;
  currentUserId: string = '';
  currencySelected: string = 'USD';
  price!: number;
  value!: number;

  constructor(private coin: CoinService,
    private portfolio: PortfolioService,
    ) {}

  ngOnInit(): void {
    this.getTop7Coins();
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserId = this.currentUserSubject.value.id;
    this.getUserPortfolios();
   
  }

  next() {
    this.slickModal.slickNext();
  }
  
  prev() {
    this.slickModal.slickPrev();
  }


  getTop7Coins(){
    this.coin.getCurrency(this.currency).subscribe((res) => {
      this.TrendingCoins = res.filter((element: { id: string;market_cap_rank:string }) =>
       element.market_cap_rank in [1,2,3,4,5,6,7,8,9,10,11]
      );    
      this.TrendingCoins.forEach(
        (element: {
          id:string;
          price_change_7d: number;
          status: string;
        }) => {     
          this.coin.getCurrencyById(element.id).subscribe((res) => {
            //console.log(res)
            element.price_change_7d=res.market_data.price_change_percentage_7d;
            if (element.price_change_7d<=0) {
              element.status = 'text-danger';
            } else {
              element.status = 'text-success';
            }
          })       
        }) 
        //console.log(this.TrendingCoins)
    })
  }


  getUserPortfolios() {
    this.portfolio
      .getUserPortfolios(this.currentUserId)
      .subscribe((content: any) => {
        this.portfolios = content;
        this.portfolios.forEach(
          (element: {
            id:string;
            hv: number;
            nbrTransactions:number;
          }) => {
            this.coin
            .getTransactions(element.id)
            .subscribe((content: any) => {
             //console.log(content)
             element.nbrTransactions=content.length;
             if(element.nbrTransactions==0)
             {
               element.hv=0
             }
             let hv=0
             for (let item of content) {
              this.coin
              .getExchangeByCoinId(item.coinId, this.currencySelected)
              .subscribe((content: any) => {
                let price = content[item.coinId.toLowerCase()];                
                this.price = price[this.currencySelected.toLocaleLowerCase()];
                item.value = this.price * item.quantity;
               
                if (item.type == 'BUY' || item.type == 'TRANSFER_IN') {
                  hv = hv + item.value;
                } else {
                  hv = hv - item.value;
                }
                element.hv=hv
                //console.log( element.hv)
            })
             }
            })
      });
    //console.log(this.portfolios)
  })
  }
}
