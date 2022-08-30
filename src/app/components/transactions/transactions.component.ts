import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { CoinService } from 'src/app/services/coin.service';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { UpdateTransactionComponent } from '../update-transaction/update-transaction.component';

export class Transaction {
  id!: string;
  coinId!: string;
  portfolioId!: string;
  type!: string;
  price!: number;
  quantity!: number;
  date!: Date;
  fiatCurrency!: string;
  notes!: string;
  fees!: number;
  status!: string;
  pnl!: number;
  total!: number;
  value!: number;
  change!: number;
  value24: number;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  currentUser: BehaviorSubject<User>;
  currentUserId: string = '';
  currencySelected: string = 'USD';
  price!: number;
  portfolioID!: string;
  holdings: number = 0;
  pl: number = 0.0;
  cost: number = 0.0;
  hv: number = 0;
  value24: number = 0;
  change: number = 0;
  percent24: number;
  currency: string;
  constructor(
    private router: Router,
    private coin: CoinService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.portfolioID = val['id'];
    });
    this.currentUser = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserId = this.currentUser.value.id;
    this.getTransactions();
  }
  addTransaction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      portfolioId: this.portfolioID,
    };
    const dialogRef = this.dialog.open(AddTransactionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.reloadCurrentRoute();
    });
  }
  getTransactions() {
    this.coin
      .getTransactions(this.portfolioID)
      .subscribe((content: Transaction[]) => {
        for (let item of content) {
          this.coin
            .getExchangeByCoinId(item.coinId, this.currencySelected)
            .subscribe((content: any) => {
              let price = content[item.coinId.toLowerCase()];
              this.price = price[this.currencySelected.toLocaleLowerCase()];
              item.value = this.price * item.quantity;
              if (item.type == 'BUY' || item.type == 'TRANSFER_IN') {
                this.hv = this.hv + item.value;
              } else {
                this.hv = this.hv - item.value;
              }
            });
          this.coin.get24hChange(item.coinId).subscribe((content: any) => {
            let change = content[item.coinId.toLowerCase()];
            item.change = change.usd_24h_change / 100;
            item.value24 = (1 - item.change) * item.value;
            if (item.type == 'BUY' || item.type == 'TRANSFER_IN') {
              this.value24 = this.value24 + item.value24;
            } else {
              this.value24 = this.value24 - item.value24;
            }
            this.change = this.hv - this.value24;
            this.percent24 = this.change / this.hv;
          });

          if (item.type != 'SELL') {
            this.coin
              .getExchangeByCoinId(item.coinId, this.currencySelected)
              .subscribe((content: any) => {
                let price = content[item.coinId.toLowerCase()];
                this.price = price[this.currencySelected.toLocaleLowerCase()];
                if (item.type == 'BUY') {
                  item.pnl = this.price - item.price;
                  console.log(item.pnl);
                } else if (item.type == 'TRANSFER_IN') {
                  item.pnl = this.price;
                } else if (item.type == 'TRANSFER_OUT') {
                  item.pnl = this.price * -1;
                }
              });
          }
          if (item.type == 'BUY' || item.type == 'TRANSFER_IN') {
            item.status = 'text-success';
          } else {
            item.status = 'text-danger';
          }
          if (item.type == 'BUY' || item.type == 'SELL') {
            item.total = item.price * item.quantity + item.fees;
          }
          this.transactions.push(item);
        }
        this.transactions = this.transactions.sort(function (a, b) {
          var dateA = new Date(a.date).getTime();
          var dateB = new Date(b.date).getTime();
          return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
        });
        console.log(this.transactions);
        this.stats();
      });
  }
  stats() {
    for (let item of this.transactions) {
      if (item.status == 'text-danger') {
        this.holdings = this.holdings - item.quantity;
      } else {
        this.holdings = this.holdings + item.quantity;
      }
      if (item.type != 'SELL') {
        this.pl = this.pl + item.pnl;
      }
      if (item.type == 'BUY') {
        this.cost = this.cost + item.total;
      }
    }
  }
  editTransaction(transaction: Transaction) {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(UpdateTransactionComponent, {
      data: transaction,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.reloadCurrentRoute();
    });
  }
  deleteTransaction(transaction: Transaction) {
    this.coin.deleteTransaction(transaction.id).subscribe({
      next: (res) => {
        console.log(res);
        this.reloadCurrentRoute();
      },
      error: (e) => console.error(e),
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
