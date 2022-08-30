
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IntersetOverTime } from 'src/app/models/InterestOverTime';
import { GoogleinterestService } from 'src/app/services/googleinterest.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  
  ApexPlotOptions,
  ApexGrid,
  ApexStates,
  ApexTheme,
  ApexFill,
  ApexMarkers
} from "ng-apexcharts";

import { NotificationService } from 'src/app/notification.service';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { series } from '../codeRegion';
import { CoinService } from 'src/app/services/coin.service';
import { IntersetRegion } from 'src/app/models/InterestRegion';
import { RelatedQuery } from 'src/app/models/RelatedQuery';
import { IntersetSubRegion } from 'src/app/models/InterestSubRegion';
import { TwitterService } from 'src/app/services/twitter.service';
type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  tooltip?: ApexTooltip| any;
  stroke?: ApexStroke | any;
  dataLabels?: ApexDataLabels | any;
  yaxis?: ApexYAxis | any;
  title?: ApexTitleSubtitle | any;
  labels?: string[] | any;
  legend?: ApexLegend | any;
  subtitle?: ApexTitleSubtitle | any;
};
export type ChartOptions2 = {
  series?: ApexNonAxisChartSeries | any;
  chart?: ApexChart | any;
  responsive?: ApexResponsive[] | any;
  labels: any;
  legend?: ApexLegend | any;
};
export type ChartOptions3 = {
  series?: ApexNonAxisChartSeries | any;
  chart?: ApexChart | any;
  responsive?: ApexResponsive[] | any;
  labels: any;
  fill: any;
  stroke?: ApexStroke | any;
  states?: ApexStates | any;
  legend?: ApexLegend | any;
  title?: ApexTitleSubtitle | any;
  theme?: ApexTheme | any;
  plotOptions?: ApexPlotOptions | any;
  dataLabels?: ApexDataLabels | any;
  
};

export type ChartOptions4 = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  dataLabels?: ApexDataLabels | any;
  plotOptions?: ApexPlotOptions | any;
  xaxis?: ApexXAxis | any;
};
export type ChartOptions5 = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  dataLabels?: ApexDataLabels | any;
  grid?: ApexGrid | any;
  fill?: ApexFill | any;
  markers?: ApexMarkers | any;
  yaxis?: ApexYAxis | any;
  stroke?: ApexStroke | any;
  title?: ApexTitleSubtitle | any;
  tooltip?: ApexTooltip| any;
};

@Component({
  selector: 'app-interset-over-time',
  templateUrl: './interset-over-time.component.html',
  styleUrls: ['./interset-over-time.component.css']
})
export class IntersetOverTimeComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  options!: FormGroup;
  @ViewChild("chart2") chart2!: ChartComponent;
  public chartOptions2: Partial<ChartOptions2>;
  @ViewChild("chart3") chart3!: ChartComponent;
  public chartOptions3: Partial<ChartOptions3>;
  @ViewChild("chart4") chart4!: ChartComponent;
  public chartOptions4: Partial<ChartOptions4>;
  @ViewChild("chart5") chart5!: ChartComponent;
  public chartOptions5: Partial<ChartOptions5>;


  selectedCoin = new FormControl('Bitcoin', [
    Validators.required,
    Validators.pattern('Bitcoin'),
  ]);
  selectedTime = new FormControl('hour', [
    Validators.required,
    Validators.pattern('hour'),
  ]);
  selectedGeo = new FormControl('TN', [
    Validators.required,
    Validators.pattern('TN'),
  ]);
   coutry_code:any
  coins:any=[]

  
  
 

  constructor(public googleinterestService:GoogleinterestService,public datepipe: DatePipe
    ,public notification:NotificationService,
    private coinService: CoinService) { 
    /*********** Form ************** */
      this.coinService.getCurrency('USD').subscribe((res) => {
        
        
        res.forEach((element :any)=> {
          this.coins.push(this.titleCaseWord(element.id))
          
        });
        

      }
        );
        
    this.coutry_code=series.coutry_code

    /********************    CHARTS   ****************** */
    
    this.chartOptions = {
      series: [
        {
          name: "Interest",
          data: []
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
  
      title: {
        text: "Fundamental Analysis of Google Interests ",
        align: "left"
      },
      subtitle: {
        text: "Interest Over Time",
        align: "left"
      },
      labels: [],
      xaxis: {
        type: "datetime",
        
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm:ss"
        }
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      },
      
    };
  /********************************** */
  this.chartOptions2 = {
    series: [],
    chart: {
      type: "donut"
    },
    labels: [],
    responsive: [
      {
        breakpoint: 575,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: "bottom",
            show: true,
          },
          dataLabels: {
              enabled: false,
          },
        }
      }
    ]
  };
  /************************************************************* */
  this.chartOptions3 = {
    series: [],
      chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
      labels: [],
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8
        }
      },
      fill: {
        type: "pattern",
        opacity: 1,
        pattern: {
          enabled: true,
          style: [
            "verticalLines",
            "squares",
            "horizontalLines",
            "circles",
            "slantedLines"
          ]
        }
      },
      states: {
        hover: {
          filter: {
            type: "none"
          }
        }
      },
      theme: {
        palette: "palette2"
      },
      title: {
        text: "World Interest "
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom",
              show: true,
            },
            dataLabels: {
                enabled: false,
            },
          }
        }
      ]
  };

  /*************************************************** */
  this.chartOptions4 = {
    series: [
      {
        name: "Interest",
        data: []
      }
    ],
    chart: {
      type: "bar",
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [
    
      ]
    }
  };
  /********************************************************* */
  this.chartOptions5= {
    series: [
      {
        name: "Interest",
        data: []
      
      }
    ],
    chart: {
      
      type: "line"
    },
    stroke: {
      width: 7,
      curve: "smooth"
    },
    xaxis: {
      type: "datetime",
      categories: [
      ]
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm:ss"
      }
    },
    title: {
      text: "Interest Over Time By Region",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666"
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FDD835"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },
    markers: {
      size: 4,
      colors: ["#FFA41B"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    yaxis: {
      min: -10,
      max: 40,
      title: {
        text: ""
      }
    }
  };
  
  }
  
 

  ngOnInit(): void {
    let coin=this.selectedCoin.value
    let time=this.timeToGTrendsTime(this.selectedTime.value)
    let geo=this.selectedGeo.value
    this.getInterestOverTime(coin, time)
    this.getRelatedQuery(coin, time)
    this.getRegionInterest(coin, time)
    this.getSubRegionInterest(coin, time,geo)
    this.getInterestOverTimeRegion(coin, time,geo)
    
    
  }
  

  onSubmit(){
    let coin=this.selectedCoin.value
    let time=this.timeToGTrendsTime(this.selectedTime.value)
    let geo=this.selectedGeo.value
    console.log(coin+"   >>>>>/>>>>>  "+time+"   >>>>>/>>>>>  "+geo)
    this.getInterestOverTime(coin, time)
    this.getRelatedQuery(coin, time)
    this.getRegionInterest(coin, time)
    this.getSubRegionInterest(coin, time,geo)
    this.getInterestOverTimeRegion(coin, time,geo)
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }


  timeToGTrendsTime(time:string):string{
    let GTrendsTime='now 1-H'
    switch (time) {
      case 'hour':
        GTrendsTime='now 1-H'
        break;
      case 'day':
        GTrendsTime='now 1-d'
        break;
      case 'week':
        GTrendsTime='now 7-d'
        break;
      case 'month':
        GTrendsTime='today 1-m'
        break;
      case 'year':
        GTrendsTime='today 12-m'
        break;
    
      default:
        GTrendsTime='all'
        break;
    }
    return GTrendsTime

  }

  /**************************** getInterestOverTime  ********************************** */
  
  getInterestOverTime(coin:string,time:string) {
    let dates_: any = [];
    let interest_: any = [];
    this.googleinterestService.getInterestOverTime(coin,time,"cc").subscribe((content: any) => {
      if(content.length==0){
        this.notification.showWarning("Data not available ","Sorry .. ")
      }
      
      content.forEach((element: IntersetOverTime) => {
        
         dates_.push(element.date);
         interest_.push(Number(element.interst))
         

      }); 
      console.log("whennnnnn")
     
      this.plot(interest_,dates_)
    });
    
  }

  plot(interest:any,dates:any){
    console.log(interest)
    this.chartOptions = {
      series: [
        {
          name: "Interest",
          data: interest
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Fundamental Analysis of Google Interests ",
        align: "left"
      },
      subtitle: {
        text: "Interest Over Time",
        align: "left"
      },
      labels: dates,
      xaxis: {
        type: "datetime",
        
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm:ss"
        }
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      },
      
    };
  }
 
  



  /********************************  InterestBySubRegion   ********************************************* */
  getSubRegionInterest(coin:string,time:string,geo:string) {
    let coutries: any = [];
    let interest_: any = [];
    this.googleinterestService.getInterestBySubRegion(coin,time,"cc",geo).subscribe((content: any) => {
      if(content.length==0){
        this.notification.showWarning("There is not enough data for your search to display this page","Sorry .. ")
      }
      
      content.forEach((element: IntersetSubRegion) => {
        
        coutries.push(element.subRegion);
         interest_.push(Number(element.interst))
         

      }); 
      
      console.log(coutries)
      this.plot2(interest_,coutries)
    });
  }
  plot2(interest:any,coutries:any){
    
    this.chartOptions2 = {
      series: interest,
    chart: {
      type: "donut"
    },
    labels: coutries,
    responsive: [
      {
        breakpoint: 575,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: "bottom",
            show: true,
          },
          dataLabels: {
              enabled: false,
          },
        }
      }
    ]
  };
  }

  
  /********************************  InterestByRegion   ********************************************* */
  getRegionInterest(coin:string,time:string) {
    let coutries: any = [];
    let interest_: any = [];
    this.googleinterestService.getInterestByRegion(coin,time,"cc").subscribe((content: any) => {
      if(content.length==0){
        this.notification.showWarning("Data not available ","Sorry .. ")
      }
      
      content.forEach((element: IntersetRegion) => {
        
        coutries.push(element.region);
         interest_.push(Number(element.interst))
         

      }); 
      
      console.log(coutries)
      this.plot3(interest_,coutries)
    });
  }
  plot3(interest:any,coutries:any){

    this.chartOptions3 = {
      series: interest,
      chart: {
        
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
      labels: coutries,
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8
        }
      },
      fill: {
        type: "pattern",
        opacity: 1,
        pattern: {
          enabled: true,
          style: [
            "verticalLines",
            "squares",
            "horizontalLines",
            "circles",
            "slantedLines"
          ]
        }
      },
      states: {
        hover: {
          filter: {
            type: "none"
          }
        }
      },
      theme: {
        palette: "palette2"
      },
      title: {
        text: "World Interest "
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom",
              show: true,
            },
            dataLabels: {
                enabled: false,
            },
          }
        }
      ]
    };
  

  }

   /********************************  Related Queries   ********************************************* */
  
   getRelatedQuery(coin:string,time:string) {
    let queries: any = [];
    let interest_: any = [];
    this.googleinterestService.getRelatedQuery(coin,time,"cc").subscribe((content: any) => {
      if(content.length==0){
        this.notification.showWarning("Data not available ","Sorry .. ")
      }
      
      content.forEach((element: RelatedQuery) => {
        
        queries.push(element.query);
         interest_.push(Number(element.interst))
         

      }); 
      
      console.log(queries)
      this.plot4(interest_,queries)
    });
  }
  plot4(interest:any,queries:any){
    this.chartOptions4 = {
      series: [
        {
          name: "Interest",
          data: interest
        }
      ],
      chart: {
        type: "bar",
        
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: queries
      }
    };
  }

  /********************************  InterestOverTimeRegion   ********************************************* */
  
  getInterestOverTimeRegion(coin:string,time:string,geo:string) {
    let dates_: any = [];
    let interest_: any = [];
    this.googleinterestService.getInterestOverTimeRegion(coin,time,"cc",geo).subscribe((content: any) => {
      if(content.length==0){
        this.notification.showWarning("Data not available for this region","Sorry .. ")
      }
      
      content.forEach((element: IntersetOverTime) => {
        
         dates_.push(element.date);
         interest_.push(Number(element.interst))
         

      }); 
      console.log("whennnnnn")
      console.log(dates_)
      this.plot5(interest_,dates_)
    });
    
  }
  plot5(interest:any,dates:any){
    
    this.chartOptions5= {
      series: [
        {
          name: "Interest",
          data: interest
        
        }
      ],
      chart: {
        
        type: "line"
      },
      stroke: {
        width: 7,
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: dates
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm:ss"
        }
      },
      title: {
        text: "Interest Over Time By Region",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      yaxis: {
        
        title: {
          text: ""
        }
      }
      
    };
  }


}

