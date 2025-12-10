import { AfterViewInit, Component, OnInit } from '@angular/core';

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
  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService
  ) {}

  portfolioValue = 0;
  portfolios: any[] = [];

  ngOnInit(): void {
    this.loadPortfolioData();
  }

  /**
   * Load portfolios by user and transform into bar chart data
   */
  loadPortfolioData(): void {
    this.portfolioService
      .getPortfoliosByUser(this.authService.getUserId())
      .subscribe({
        next: (portfolios) => {
          this.portfolios = portfolios;

          // Calculate total portfolio value
          this.portfolioValue = portfolios.reduce((acc, portfolio) => {
            return (acc +=
              portfolio.products?.reduce((acc, product) => {
                return (acc += product.value ?? 0);
              }, 0) ?? 0);
          }, 0);

          // Transform portfolios into bar chart data
          this.transformPortfoliosToChartData(portfolios);
        },
      });
  }


  transformPortfoliosToChartData(portfolios: any[]): void {
    // Extract portfolio names (categories for X-axis)
    const categories = portfolios.map((p) => p.name || 'Unknown');

    // Calculate total value for each portfolio
    const values = portfolios.map((p) => {
      return (
        p.products?.reduce(
          (acc: number, product: any) => acc + (product.value ?? 0),
          0
        ) ?? 0
      );
    });

    // Use fixed color palette - cycle through colors if more portfolios than colors
    const colors = portfolios.map((_, index) => 
      this.portfolioColors[index % this.portfolioColors.length]
    );


    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: 'Portfolio Value',
          data: values,
        },
      ],
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: categories,
      },
      colors: colors,
    };
  }
  // Fixed color palette for portfolios
  private portfolioColors: string[] = [
    '#1A56DB', // Blue
    '#FDBA8C', // Orange
    '#7C3AED', // Purple
    '#10B981', // Green
    '#EF4444', // Red
    '#F59E0B', // Amber
    '#06B6D4', // Cyan
    '#EC4899', // Pink
  ];

  public chartOptions: any = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name: 'Portfolio Value',
        data: [],
      }
    ],

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
      categories: [],
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

  ngAfterViewInit(): void {}
}
