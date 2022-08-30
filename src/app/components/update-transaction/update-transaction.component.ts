import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoinService } from 'src/app/services/coin.service';
import { Transaction } from '../../components/transactions/transactions.component';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.css'],
})
export class UpdateTransactionComponent implements OnInit {
  UserCoins: any = [];
  coins: string[] = [];
  coinSelected!: string;
  currentUser: any;
  transaction!: Transaction;
  typeTransfer = [
    { value: 'TRANSFER_IN', name: 'Transfert In' },
    { value: 'TRANSFER_OUT', name: 'Transfert Out' },
  ];
  currentUserId: string = '';
  currencySelected: string = 'usd';
  selectedIndex!: number;
  constructor(
    public dialogRef: MatDialogRef<UpdateTransactionComponent>,
    private coin: CoinService,
    private portfolio: PortfolioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Transaction
  ) {}

  ngOnInit(): void {
    this.transaction = this.data;
    if (this.transaction.type == 'BUY') {
      this.selectedIndex = 0;
    } else if (this.transaction.type == 'SELL') {
      this.selectedIndex = 1;
    } else {
      this.selectedIndex = 2;
    }
    this.getPortfolioCoins();
  }
  getPortfolioCoins() {
    this.portfolio
      .getPortfolioCoins(this.transaction.portfolioId)
      .subscribe((content: any) => {
        this.coins = content.coinsIDs;
        console.log(content);
      });
  }
  getExchangeByCoinId() {
    this.coin
      .getExchangeByCoinId(this.coinSelected, this.currencySelected)
      .subscribe((content: any) => {
        let price = content[this.coinSelected.toLowerCase()];
        this.transaction.price =
          price[this.currencySelected.toLocaleLowerCase()];
        this.changeTotal();
      });
  }
  changeTotal() {
    this.transaction.total =
      this.transaction.quantity * this.transaction.price!;
  }
  cancel() {
    this.dialogRef.close();
  }
  update() {
    let putTransaction = {
      id: this.transaction.id,
      coinId: this.transaction.coinId,
      userId: this.transaction.portfolioId,
      type: this.transaction.type,
      price: this.transaction.price,
      quantity: this.transaction.quantity,
      date: this.transaction.date,
      fiatCurrency: this.transaction.fiatCurrency,
      notes: this.transaction.notes,
      fees: this.transaction.fees,
    };
    this.coin.putTransaction(putTransaction).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.cancel();
  }
}
