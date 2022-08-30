import { CoinService } from './../../services/coin.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css'],
})
export class CoinDetailsComponent implements OnInit {
  selectedValue: number = 7;
  coinData: any;
  coinId!: string;
  days: number = 7;
  currency: string = 'USD';
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(235, 129, 83, 0.2)',
        borderColor: '#eb8153',
        pointBackgroundColor: '#eb8153',
        pointBorderColor: '#eb8153',
        pointHoverBackgroundColor: '#eb8153',
        pointHoverBorderColor: '#eb8153',
        fill: true,
      },
    ],
    labels: [],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },

    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  constructor(
    private coin: CoinService,
    private activatedRoute: ActivatedRoute,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.coinId = val['id'];
    });
    this.getCoinData();
    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.getGraphData(this.days);
      this.getCoinData();
    });
  }
  getCoinData() {
    this.coin.getCurrencyById(this.coinId).subscribe((res) => {
      console.log(this.coinData);
      this.coinData = res;
    });
  }
  getGraphData(days: number) {
    this.days = days;
    this.coin
      .getGraphicalCurrencyData(this.coinId, this.currency, this.days)
      .subscribe((res) => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
              : `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toLocaleDateString();
        });
      });
  }
  selectChangeHandler(event: any) {
    this.selectedValue = event.target.value;
    this.getGraphData(this.selectedValue);
  }
}
