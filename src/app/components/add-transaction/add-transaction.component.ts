import { Component, Inject, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { CurrencyService } from '../../services/currency.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { PortfolioService } from 'src/app/services/portfolio.service';
export class Exchange {
  coinId!: string;
  portfolioId!: string;
  type!: string;
  price!: number;
  quantity!: number;
  date!: string;
  fiatCurrency!: string;
  notes!: string;
  fees!: number;
}
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
})
export class AddTransactionComponent implements OnInit {
  UserCoins: any = [];
  coins: string[] = [];
  coinSelected: string = '';
  currentUser: BehaviorSubject<User>;
  currentUserId: string = '';
  currencySelected: string = 'usd';
  price!: number;
  quantity!: number;
  total!: number;
  date: Date = new Date();
  notes: string = '';
  fees!: number;
  dateSelected!: string;
  portfolioID!: string;
  typeTransfer = [
    { value: 'TRANSFER_IN', name: 'Transfert In' },
    { value: 'TRANSFER_OUT', name: 'Transfert Out' },
  ];
  typeSelected: string = 'TRANSFERIN';
  constructor(
    private coin: CoinService,
    private currencyService: CurrencyService,
    private portfolio: PortfolioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.portfolioID = this.data.portfolioId;
    console.log(this.portfolioID);
    this.currentUser = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserId = this.currentUser.value.id;
    this.getPortfolioCoins();
    this.dateSelected = this.date.toISOString().substring(0, 16);
    console.log(this.dateSelected);
    console.log(this.coinSelected);
    console.log(this.date);
  }

  getPortfolioCoins() {
    this.portfolio
      .getPortfolioCoins(this.portfolioID)
      .subscribe((content: any) => {
        this.coins = content.coinsIDs;
        console.log(content);
      });
  }
  toggleEye: boolean = true;

  toggleEyeIcon(inputPassword: any) {
    this.toggleEye = !this.toggleEye;

    inputPassword.type =
      inputPassword.type === 'password' ? 'text' : 'password';
  }
  getUserCoins() {
    this.coin.getUserCoins(this.currentUserId).subscribe((content: any) => {
      for (let item of content) {
        this.coins.push(item.name);
        console.log(this.coins);
      }
    });
  }
  getExchangeByCoinId() {
    this.coin
      .getExchangeByCoinId(this.coinSelected, this.currencySelected)
      .subscribe((content: any) => {
        let price = content[this.coinSelected.toLowerCase()];
        this.price = price[this.currencySelected.toLocaleLowerCase()];
        console.log(this.price);
        if (!this.quantity) {
          this.quantity = 1;
        }
        this.changeTotal();
      });
  }
  changeTotal() {
    this.total = this.quantity * this.price!;
  }
  buyCoins() {
    let addExchange: Exchange = {
      coinId: this.coinSelected,
      portfolioId: this.portfolioID,
      type: 'BUY',
      price: this.price,
      quantity: this.quantity,
      date: this.dateSelected,
      fiatCurrency: this.currencySelected,
      notes: this.notes,
      fees: this.fees,
    };
    this.coin.addTransaction(addExchange).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.dialog.closeAll();
  }
  sellCoins() {
    let addTransaction = {
      coinId: this.coinSelected,
      portfolioId: this.portfolioID,
      type: 'SELL',
      price: this.price,
      quantity: this.quantity,
      date: this.dateSelected,
      fiatCurrency: this.currencySelected,
      notes: this.notes,
      fees: this.fees,
    };
    this.coin.addTransaction(addTransaction).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.dialog.closeAll();
  }
  TransferCoins() {
    let addTransaction = {
      coinId: this.coinSelected,
      portfolioId: this.portfolioID,
      type: this.typeSelected,
      quantity: this.quantity,
      date: this.dateSelected,
      notes: this.notes,
      fees: this.fees,
    };
    this.coin.addTransaction(addTransaction).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.dialog.closeAll();
  }
  cancel() {
    this.dialog.closeAll();
  }
}
