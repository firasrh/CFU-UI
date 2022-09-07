import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-buy-order',
  templateUrl: './buy-order.component.html',
  styleUrls: ['./buy-order.component.css']
})
export class BuyOrderComponent implements OnInit {
  Coins: string[] = [];
  Transactions: any = [];
  currency: string = 'USD';
  UserPortfolios:  any = [];
  currentUserSubject: BehaviorSubject<User>;
  currentUserId: string = '';
  BuyTransactions: any = [];
  UserCoins: any = [];
  currency2: string;
  constructor(private coin: CoinService,  private portfolio: PortfolioService) { }

  ngOnInit(): void {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserId = this.currentUserSubject.value.id;
    this.getUserTransactions()
  }
  getUserTransactions(){
    this.portfolio
      .getUserPortfolios(this.currentUserId)
      .subscribe((content: any) => {
        this.UserPortfolios = content;
        this.UserPortfolios.forEach(
          (element: {
            id: string;
          }) => {
              this.coin
              .getTransactions(element.id)
              .subscribe((content) => {
                for (let item of content)
                {
                  this.Transactions.push(item)
                  if(!this.Coins.includes(item.coinId))
                 {this.Coins.push(item.coinId)}
                }


              })
          })
          //console.log(this.Transactions)
          //console.log(this.Coins)
          this.coin.getCurrency(this.currency).subscribe((res) => {
            this.UserCoins = res.filter((element: { id: string }) =>
              this.Coins.includes(element.id))
              console.log(this.UserCoins)
            }
            );
            
      })

  }
  
  getBuyTransactions(CoinId: string) {
    //console.log(CoinId);
    this.BuyTransactions=[]
    this.Transactions.forEach(
      (element: {
        id: string;
        coinId: string;
        type: string
      }) => {
if (element.coinId==CoinId && element.type=="BUY")
{this.BuyTransactions.push(element)}
      })
      //console.log(this.SellTransactions)
    
  }
}
