import { Component, OnInit, ViewChild } from '@angular/core';
import { TwitterService } from 'src/app/services/twitter.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { NotificationService } from 'src/app/notification.service';
import { TwitterModel } from 'src/app/models/TwitterModel';
import { FormControl, Validators } from '@angular/forms';
import { CoinService } from 'src/app/services/coin.service';
import { Candle } from 'src/app/models/Candles';
export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  stroke?: ApexStroke | any;
  dataLabels?: ApexDataLabels | any;
  markers?: ApexMarkers | any;
  tooltip?: any; // ApexTooltip;
  yaxis?: ApexYAxis | any;
  grid?: ApexGrid | any;
  legend?: ApexLegend | any;
  title?: ApexTitleSubtitle | any;
};
export type ChartOptions3 = {
   series?: ApexAxisChartSeries | any;
   chart?: ApexChart | any;
   dataLabels?: ApexDataLabels | any;
   markers?: ApexMarkers | any;
   title?: ApexTitleSubtitle | any;
   fill?: ApexFill | any;
   yaxis?: ApexYAxis | any;
   xaxis?: ApexXAxis | any;
   tooltip?: ApexTooltip | any;
};





@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("chart2") chart2!: ChartComponent;
  public chartOptions2: Partial<ChartOptions>;
  @ViewChild("chart3") chart3!: ChartComponent;
  public chartOptions3: Partial<ChartOptions3>;

  selectedCoin = new FormControl('Bitcoin', [
    Validators.required,
    Validators.pattern('Bitcoin'),
  ]);
  coins:any=[]

  constructor(private twitterService: TwitterService,public notification:NotificationService,private coinService: CoinService) { 
    /*********** Form ************** */
    this.coinService.getCurrency('USD').subscribe((res) => {
        
        
      res.forEach((element :any)=> {
        this.coins.push(this.titleCaseWord(element.id))
        
      });
      

    }
      );
      /********************CHARTS ********************** */
    
    this.chartOptions = {
      series: [
        {
          name: "",
          data: []
        },
        {
          name: "",
          data: []
        },
        {
          name: "",
          data: []
        }
      ],
      chart: {
        
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Page Statistics",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val: any, opts: any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
        
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val: any) {
                return val + " ";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val + " ";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
    /**************************************************** */
    this.chartOptions2 = {
      series: [
        {
          name: "",
          data: []
        },
        {
          name: "",
          data: []
        },
        {
          name: "",
          data: []
        }
      ],
      chart: {
        
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Page Statistics",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val: any, opts: any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
        
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val: any) {
                return val + " ";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val + " ";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
    /*************************************************************** */
    this.chartOptions3 = { 
      series: [
        {
          name: "",
          data: []
        }
        
      ],
      
      chart : {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels :{
        enabled: false
      },
      markers :{
        size: 0
      },
      title : {
        text: "Stock Price Movement",
        align: "left"
      },
      fill :{
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis : {
        labels: {
          formatter: function(val:any) {
            return (val / 1000000).toFixed(0);
          }
        },
        title: {
          text: "Price"
        }
      },
      xaxis :{
        type: "datetime"
      },
      tooltip : {
        shared: false,
        y: {
          formatter: function(val:any) {
            return (val / 1000000).toFixed(0);
          }
        }}
    };
  }

  ngOnInit(): void {
    this.notification.showInfo("Your Statistics are loading please wait ..","Hi,")
    let coin=this.selectedCoin.value
    this.getTweets(coin)
    this.getCandles(coin)
  }
  onSubmit(): void {
    this.notification.showInfo("Your Statistics are loading please wait ..","Hi,")
    let coin=this.selectedCoin.value
    this.getTweets(coin)
    this.getCandles(coin)
  }
   titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }





  /********************************* Functions **************************** */
  getTweets(coin:string) {
    let dates: any = [];
    let likes: any = [];
    let comments: any = [];
    let retweets: any = [];
    this.twitterService.getTweets(coin).subscribe((content: any) => {
      if(content.length==0){
        this.notification.showWarning("Data not available ","Sorry .. ")
      }
      
      content.forEach((element: TwitterModel) => {
        

        dates.push(new Date(element.datetime).toUTCString());
        likes.push(Number(element.tweet_likes))
        comments.push(Number(element.tweet_Comments))
        retweets.push(Number(element.tweet_Retweets))
         

      }); 
      console.log("whennnnnn")
     
      this.plot(coin,likes,retweets,comments,dates)
    });
    
  }

  plot(coin:any,likes:any,retweets:any,comments:any,dates:any){
    this.chartOptions = {
      series: [
        {
          name: "Likes",
          data: likes
        },
        {
          name: "Comments",
          data: comments
        },
        {
          name: "Retweets",
          data: retweets
        }
      ],
      chart: {
        
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: coin+" Twitter Statistics",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val: any, opts: any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          trim: false
        },
        categories: dates
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm:ss"
        },
        y: [
          {
            title: {
              formatter: function(val: any) {
                return val + " ";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val + " ";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };



  }

  /********************************************************** */
  getCandles(coin:string) {
    let dates: any = [];
    let close: any = [];
    let open: any = [];
    let low: any = [];
    let volume: any = [];
    this.twitterService.getCandles(coin).subscribe((content: any) => {
      if(content.length==0){
        this.notification.showWarning("Data not available ","Sorry .. ")
      }
      
      content.forEach((element: Candle) => {
        

        dates.push(new Date(element.Date).toUTCString());
        open.push(element.Open)
        close.push(element.Close)
        low.push(element.Low)
        volume.push(element.Volume)
        
         

      }); 
      console.log("whennnnnn")
     
      this.plot2(coin,open,close,low,dates)
      this.plot3(coin,volume,dates)
    });
    
  }
  plot2(coin:any,open:any,close:any,low:any,dates:any){
    this.chartOptions2 = {
      series: [
        {
          name: "Open Price",
          data: open
        },
        {
          name: "Close Price",
          data: close
        },
        {
          name: "Low Price",
          data: low
        },
        
      ],
      chart: {
        
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: coin+" Prices Statistics",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val: any, opts: any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          trim: false
        },
        categories: dates
      },
      yaxis : {
        labels: {
          formatter: function(val:any) {
            return (val).toFixed(0);
          }
        }},
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm:ss"
        },
        y: [
          {
            title: {
              formatter: function(val: any) {
                return val + " ";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val + " ";
              }
            }
          },
          {
            title: {
              formatter: function(val: any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };

  }
  plot3(coin:any,volume:any,dates:any){
    this.chartOptions3 = { 
      series: [
        {
          name: "",
          data: volume
        }
        
      ],
      
      chart : {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels :{
        enabled: false
      },
      markers :{
        size: 0
      },
      title : {
        text: coin+" Volume Movement",
        align: "left"
      },
      fill :{
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis : {
        labels: {
          formatter: function(val:any) {
            return (val).toFixed(0);
          }
        },
        title: {
          text: "Volume"
        }
      },
      xaxis :{
        type: "datetime",
        labels: {
          trim: false
        },
        categories: dates
      },
      tooltip : {
        x: {
          format: "dd/MM/yy HH:mm:ss"
        },
        shared: false,
        y: {
          formatter: function(val:any) {
            return val ;
          }
        }}
    };
    
  }

}
