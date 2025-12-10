import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { OrderService } from '../../../services/order.service';
import { ToastModule } from 'primeng/toast';

import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { OrderDto } from '../../../models/order-dto';
import { Portfolio } from '../../../models/portfolio';
import { PortfolioService } from '../../../services/portfolio.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

interface Select {
  name: string;
  code?: string;
}

@Component({
  selector: 'app-orderform',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    CommonModule,
    ToastModule,
    RippleModule,
  ],
  templateUrl: './orderform.component.html',
  styleUrl: './orderform.component.scss',
  providers: [MessageService],
})
export class OrderformComponent implements OnInit {
  constructor(
    private orderservice: OrderService,
    private messageservice: MessageService,
    private authservice: AuthService,
    private portfolioservice: PortfolioService,
    private productservice: ProductService
  ) {}
  ngOnInit(): void {
    this.portfolioservice
      .getPortfoliosByUser(this.authservice.getUserId() as string)
      .subscribe({
        next: (result) => {
          this.portfolios = result;
          // console.log(this.portfolios);
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('Not Found');
          } else {
            console.error(error.message);
          }
        },
      });
    this.productservice.getAllProducts().subscribe({
      next: (result) => {
        this.products = result;

        // console.log(this.products);
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
  portfolios: Portfolio[] = [];

  types: Select[] = [{ name: 'LIMIT' }, { name: 'MARKET' }];
  sides: Select[] = [{ name: 'BUY' }, { name: 'SELL' }];

  products: Product[] = [];

  formdata = {
    selectedProduct: { ticker: '' },
    selectedPortfolio: { id: '' },
    selectedType: { name: '' },
    selectedSide: { name: '' },
    price: null,
    quantity: null,
  };

  placeOrder(e: Event) {
    e.preventDefault();

    // Validation checks
    if (!this.formdata.selectedProduct?.ticker) {
      this.messageservice.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please select a product',
      });
      return;
    }

    if (!this.formdata.selectedPortfolio?.id) {
      this.messageservice.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please select a portfolio',
      });
      return;
    }

    if (!this.formdata.selectedType?.name) {
      this.messageservice.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please select an order type (LIMIT or MARKET)',
      });
      return;
    }

    if (!this.formdata.selectedSide?.name) {
      this.messageservice.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please select a side (BUY or SELL)',
      });
      return;
    }

    // Price is required only for LIMIT orders, not for MARKET orders
    if (this.formdata.selectedType?.name === 'LIMIT') {
      if (!this.formdata.price || this.formdata.price <= 0) {
        this.messageservice.add({
          severity: 'error',
          summary: 'Validation Error',
          detail: 'Please enter a valid price for LIMIT orders',
        });
        return;
      }
    }

    if (!this.formdata.quantity || this.formdata.quantity <= 0) {
      this.messageservice.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter a valid quantity',
      });
      return;
    }

    // All validation passed, proceed with order placement
    this.orderservice
      .placeOrder({
        portfolioId: this.formdata.selectedPortfolio.id,
        product: this.formdata.selectedProduct.ticker,
        type: this.formdata.selectedType.name,
        side: this.formdata.selectedSide.name,
        price:
          this.formdata.selectedType.name === 'MARKET'
            ? 0
            : this.formdata.price,
        quantity: this.formdata.quantity,
        userId: this.authservice.getUserId(),
      })
      .subscribe({
        next: (result) => {
          // this.formdata = {
          //   selectedProduct: { ticker: '' },
          //   selectedPortfolio: { id: '' },
          //   selectedType: { name: '' },
          //   selectedSide: { name: '' },
          //   price: null,
          //   quantity: null,
          // };

          this.messageservice.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order was placed successfully',
          });
        },
        error: (error) => {
          this.messageservice.add({
            severity: 'error',
            summary: 'Error',
            detail: `${
              error.error?.detail || 'Failed to place order, try again'
            }`,
          });
        },
      });
  }
}
