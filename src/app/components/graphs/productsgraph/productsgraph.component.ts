import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexYAxis,
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import {
  ProductHistory,
  ProductHistoryGraphData,
} from '../../../models/product-history';
import { forkJoin, map, Observable, switchMap, interval, of, catchError, throwError, Subscription, subscribeOn } from 'rxjs';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { WebsocketService } from '../../../services/websocket.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title?: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-productsgraph',
  standalone: true,
  imports: [NgApexchartsModule, SpinnerComponent],
  templateUrl: './productsgraph.component.html',
  styleUrl: './productsgraph.component.scss',
})
export class ProductsgraphComponent {
  constructor(
    private cdr: ChangeDetectorRef, 
    private productservice: ProductService, 
    private websocketservice: WebsocketService
  ) {}
  isLoading = false;

  ngOnInit() {
    this.websocketservice.getMessages().subscribe({
      next: () => {
        this.fetchProductChartData();
      }
    })
    this.fetchProductChartData()
    this.cdr.detectChanges();
  }



  fetchProductChartData(){
    this.productservice.getChartData().subscribe({
      next: (data) => {
        this.chartOptions = {
          ...this.chartOptions,
          series: data as any,
        };
      }
    });
  }

  

  public chartOptions:ChartOptions = {
    chart: {
      height: '250',
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: '#1C64F2',
        gradientToColors: ['#1C64F2'],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [],
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
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
  };
}
