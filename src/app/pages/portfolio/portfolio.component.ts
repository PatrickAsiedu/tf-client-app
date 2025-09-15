import { Component, OnInit } from '@angular/core';
import { MaincontainerComponent } from '../../components/container/maincontainer/maincontainer.component';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { NongridcontainerComponent } from '../../components/container/nongridcontainer/nongridcontainer.component';
import { Table } from 'primeng/table';
import { Product } from '../../models/product';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { PortfolioProductsService } from '../../services/portfolio-products.service';
import { ProductService } from '../../services/product.service';
import { PortfolioProduct } from '../../models/portfolio-product';
import { Portfolio } from '../../models/portfolio';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [MaincontainerComponent, NongridcontainerComponent,TableModule, TagModule, RatingModule, ButtonModule, CommonModule,ConfirmDialogModule, ToastModule, ButtonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
 

  constructor(
    private route: ActivatedRoute,
    private portfolioservice: PortfolioService,
    private portfolioProductsService: PortfolioProductsService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.portfolioId = this.route.snapshot.paramMap.get('id');
    this.portfolioservice.getPortolioById(this.portfolioId as string).subscribe({
      next: (info) => {
        this.portFolio = info;
      }
    });
    this.portfolioProductsService.getPortfoliosProducts(this.portfolioId as string).subscribe({
      next: (portfolioProducts) => {
        this.portfolioProducts = portfolioProducts.map(product => ({
          ...product,
          product: {
            ...product.product,
            logo: this.productService.addIconsToProducts(product.product?.ticker as string),
            name: this.productService.addNameToProducts(product.product?.ticker as string)
          }
        }));
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          console.error('Not Found');
        } else {
          console.error(error.message);
        }
      },
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
        default:
          return undefined;
    }
  }

  portfolioId: string | null = null;
  portfolioProducts: PortfolioProduct[] = []
  portFolio: Portfolio = {};
  isLoading: boolean = true;
}
