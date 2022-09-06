import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin.service';
@Component({
  selector: 'app-quick-trade',
  templateUrl: './quick-trade.component.html',
  styleUrls: ['./quick-trade.component.css'],
})
export class QuickTradeComponent implements OnInit {
  Coins: any = [];
  currency: string = 'USD';
  price!: number;
  quantity!: number;
  total!: number;
  constructor( private coin: CoinService) {}

  ngOnInit(): void {
    this.getCoins()
  }
  getCoins(){
    this.coin.getCurrency(this.currency).subscribe((res) => {
      this.Coins = res;})
  }
 getCoinId(CoinId: string) {
    console.log(CoinId);
    this.coin
      .getExchangeByCoinId(CoinId, this.currency)
      .subscribe((content: any) => {
        let price = content[CoinId.toLowerCase()];
        this.price = price[this.currency.toLocaleLowerCase()];
        console.log(this.price);
        if (!this.quantity) {
          this.quantity = 1;
        }
        this.changeTotal();
      })
  }
  changeTotal() {
    this.total = this.quantity * this.price!;
  }
}
