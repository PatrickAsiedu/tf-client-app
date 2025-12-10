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
import {
  forkJoin,
  map,
  Observable,
  switchMap,
  interval,
  of,
  catchError,
  throwError,
  Subscription,
  subscribeOn,
} from 'rxjs';
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
    // Fetch initial chart data
    this.fetchProductChartData();

    // Subscribe to websocket messages and append data instead of refetching
    this.websocketservice.getMessages().subscribe({
      next: (message) => {
        this.handleWebsocketMessage(message);
      },
      error: (err) => console.error('WebSocket error:', err),
    });

    this.cdr.detectChanges();
  }


  handleWebsocketMessage(message: any) {
    if (message && message.ticker && message.lastTradedPrice !== undefined) {
      this.appendDataToChart(message.ticker, message.lastTradedPrice);
    }
  }


  appendDataToChart(ticker: string, price: number) {
    if (!this.chartOptions.series || this.chartOptions.series.length === 0) {
      return;
    }

    // Find series matching the ticker
    const series = this.chartOptions.series as any[];
    const matchingSeries = series.find((s) => s.name === ticker);

    if (matchingSeries && matchingSeries.data) {
      // Create new data point with current timestamp and price
      const timestamp = new Date().toISOString();
      const newDataPoint: [string, number] = [timestamp, price];

      // Append to existing data
      matchingSeries.data.push(newDataPoint);

      // Update chartOptions.series to trigger change detection
      this.chartOptions = {
        ...this.chartOptions,
        series: [...series],
      };

      // Trigger change detection to update chart
      this.cdr.markForCheck();
    }
  }

  fetchProductChartData() {
    this.productservice.getChartData().subscribe({
      next: (data) => {
        this.chartOptions = {
          ...this.chartOptions,
          series: data as any,
        };
        this.cdr.markForCheck();
      },
    });
  }

  public chartOptions: ChartOptions = {
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
