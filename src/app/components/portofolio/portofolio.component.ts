import { Coin } from './../../models/Coin';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CoinService } from '../../services/coin.service';
import { CurrencyService } from '../../services/currency.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
export interface ChipColor {
  name: string;
  color: ThemePalette;
}
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
  ApexResponsive,
} from 'ng-apexcharts';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { NotificationService } from 'src/app/notification.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  tooltip: ApexTooltip | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  colors: string[] | any;
  responsive: ApexResponsive[] | any;
};

@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css'],
})
export class PortofolioComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  closeResult: string = '';
  bannerData: any = [];
  UserCoins: any = [];
  currency: string = 'USD';
  coinId: string = '';
  days: number = 7;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'symbol',
    'current_price',
    'price_change_percentage_24h',
    'market_cap',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedCoin?: Coin;
  currentUserSubject: BehaviorSubject<User>;
  currentUserId: string = '';
  userID: string = '';
  coins: string[] = [];
  items: number[] = [
    1, 2, 3, 1, 4, 2, 4, 2, 2, 1, 2, 5, 1, 4, 1, 1, 5, 4, 3, 2, 4, 2,
  ];
  searchTerm = '';
  term = '';
  data: number[] = [];
  asset_platform_id: string = '';
  portfolioID!: string;
  portfolioName!: string;
  categories: string[] = [];
  constructor(
    private modalService: NgbModal,
    private coin: CoinService,
    private currencyService: CurrencyService,
    private router: Router,
    private portfolio: PortfolioService,
    private activatedRoute: ActivatedRoute,
    public notification: NotificationService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Desktops',
          data: [],
        },
      ],
      chart: {
        width: 220,
        height: 50,
        type: 'line',
        sparkline: {
          enabled: true,
        },
        zoom: {
          enabled: false,
        },
      },

      colors: ['#eb8153'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            chart: {
              width: 150,
              height: 50,
            },
          },
        },
      ],
    };
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.portfolioID = val['id'];
    });
    this.getPortfolioCoins();
    this.getAllData();
    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.getAllData();
    });
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserId = this.currentUserSubject.value.id;
    this.getPortfolioCoins();
    this.getAllData();
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  getAllData() {
    this.coin.getCurrency(this.currency).subscribe((res) => {
      this.UserCoins = res.filter((element: { id: string }) =>
        this.coins.includes(element.id)
      );
      console.log(res);
      this.UserCoins.forEach(
        (element: {
          id: string;
          data: number[];
          asset_platform_id: string;
          categories: string[];
          cat: string[];
        }) => {
          this.coin
            .getGraphicalCurrencyData(element.id, this.currency, this.days)
            .subscribe((res) => {
              element.data = res.prices.map((a: any) => {
                return a[1];
              });
            });
          this.coin.getCurrencyById(element.id).subscribe((res) => {
            element.categories = res.categories.filter((element: string) => {
              return element !== null;
            });
            if (element.categories.length > 3) {
              element.cat = element.categories.slice(3);
            }

            if (res.asset_platform_id) {
              element.asset_platform_id = res.asset_platform_id;
            } else {
              element.asset_platform_id = res.name;
            }
          });
        }
      );
      console.log(this.UserCoins);
      this.bannerData = res;
    });
  }
  getPortfolioCoins() {
    this.portfolio
      .getPortfolioCoins(this.portfolioID)
      .subscribe((content: any) => {
        this.coins = content.coinsIDs;
        this.portfolioName = content.name;
      });
  }
  onSelect(coin: Coin): void {
    this.notification.showSuccess('Coin added to portfolio', '');
    this.selectedCoin = coin;
    const data = {
      id: coin.id,
      name: coin.name,
    };
    this.portfolio.addCoinToPortfolio(this.portfolioID, coin.id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.coin.createCoin(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    this.reloadCurrentRoute();
  }

  deleteUserCoin(id: string) {
    this.portfolio.deleteCoinFromPortfolio(this.portfolioID, id).subscribe({
      next: (res) => {
        console.log(this.portfolioID, id);
        this.reloadCurrentRoute();
      },
      error: (e) => console.error(e),
    });
  }
  gotoDetails(item: any) {
    this.router.navigate(['CoinDetails', item.id]);
  }
  gotoTransactions() {
    this.router.navigate(['transactions', this.portfolioID]);
  }
}
