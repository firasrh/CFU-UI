import { Component, OnInit, ViewChild } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexResponsive,
} from 'ng-apexcharts';
import { CurrencyService } from 'src/app/services/currency.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  stroke: ApexStroke | any;
  dataLabels: ApexDataLabels | any;
  yaxis: ApexYAxis | any;
  title: ApexTitleSubtitle | any;
  labels: string[] | any;
  legend: ApexLegend | any;
  subtitle: ApexTitleSubtitle | any;
  colors: string[] | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  grid: ApexGrid | any;
  responsive: ApexResponsive[] | any;
};

@Component({
  selector: 'app-graph-market-overview',
  templateUrl: './graph-market-overview.component.html',
  styleUrls: ['./graph-market-overview.component.css'],
})
export class GraphMarketOverviewComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  days: number = 7;
  currency: string = 'USD';
  The3BestCoins: any = [];
  checkedValue: string = "bitcoin";
  constructor(private coin: CoinService, private currencyService: CurrencyService) {
    this.chartOptions = {
      series: [
        {
          name: 'series1',
          data: [],
        },
      ],
      chart: {
        height: 350,
        toolbar: {
          show: false,
        },
        type: 'area',
      },
      colors: ['#eb8153'],
      legend: {
        show: false,
      },
      grid: {
        borderColor: '#EEEEEE',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 4,
        curve: 'smooth',
      },
      labels: [],
      xaxis: {
        labels: {
          show: false,
          style: {
            colors: '#787878',
            fontSize: '13px',
            fontFamily: 'Poppins',
            fontWeight: 400,
  
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#787878',
            fontSize: '13px',
            fontFamily: 'Poppins',
            fontWeight: 400,
          },
          formatter: function (value: any) {
            return value + 'k';
          },
        },
      },
      fill: {
        opacity: 0.2,
        type: 'solid',
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },

    };
  }
  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.getGraphData(this.checkedValue);
    });
  }
  getGraphData(coinId: string){
    this.coin
      .getGraphicalCurrencyData(coinId, this.currency, this.days)
      .subscribe((res) => {
        this.chartOptions.series[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.chartOptions.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
              : `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toLocaleDateString();
        
       });
       console.log(this.chartOptions.labels)
      });
  }
  
  checkValue(event: any){
    this.getGraphData(event.value);
 }
}
