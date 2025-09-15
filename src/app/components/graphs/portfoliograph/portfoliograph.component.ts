import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

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
  ApexPlotOptions,
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PortfolioService } from '../../../services/portfolio.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

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
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-portfoliograph',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './portfoliograph.component.html',
  styleUrl: './portfoliograph.component.scss',
})
export class PortfoliographComponent implements AfterViewInit, OnInit {
  constructor(private portfolioService: PortfolioService, private authService: AuthService){}
  ngOnInit(): void {
    this.portfolioService.getPortfoliosByUser(this.authService.getUserId()).subscribe({
      next: (portfolios) => {
        this.portfolioValue = portfolios.reduce((acc, portfolio) => {
          return acc += portfolio.products?.reduce((acc, product) => { return acc += product.value ?? 0}, 0) ?? 0
        },0);
      }
    })
  }
  public chartOptions: any = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name: "Income",
        color: "#1A56DB",
        data: ["1420", "1620", "1820", "1420", "1650", "2120"],
      },
      // {
      //   name: "Expense",
      //   data: ["788", "810", "866", "788", "1100", "1200"],
      //   color: "#F05252",
      // }
    ],
    // series: [
    //   {
    //     name: 'Tech',
    //     color: '#1A56DB',
    //     data: [231, 122, 63, 421, 122, 323, 111],
    //   },
    //   // {
    //   //   name: "Loss",
    //   //   color: "#FDBA8C",
    //   //   data: [
    //   //     { x: "Mon", y: 232 },
    //   //     { x: "Tue", y: 113 },
    //   //     { x: "Wed", y: 341 },
    //   //     { x: "Thu", y: 224 },
    //   //     { x: "Fri", y: 522 },
    //   //     { x: "Sat", y: 411 },
    //   //     { x: "Sun", y: 243 },
    //   //   ],
    //   // },
    // ],
    chart: {
      type: 'bar',
      height: '320px',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        borderRadiusApplication: 'end',
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: 'Inter, sans-serif',
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
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
    fill: {
      opacity: 1,
    },
  };

  letters = '0123456789ABCDEF';
  color = '#';

  portfolioValue = 0

  getRandomColor() {
    this.color = '#'; // <-----------
    for (var i = 0; i < 6; i++) {
        this.color += this.letters[Math.floor(Math.random() * 16)];
    }
}

  ngAfterViewInit(): void {}
}
