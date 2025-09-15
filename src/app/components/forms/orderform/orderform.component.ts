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
    console.log({});

    this.orderservice
      .placeOrder({
        portfolioId: this.formdata.selectedPortfolio.id,
        product: this.formdata.selectedProduct.ticker,
        type: this.formdata.selectedType.name,
        side: this.formdata.selectedSide.name,
        price: this.formdata.price,
        quantity: this.formdata.quantity,
        userId: this.authservice.getUserId(),
      })
      .subscribe({
        next: (result) => {
          this.formdata = {
            selectedProduct: { ticker: '' },
            selectedPortfolio: { id: '' },
            selectedType: { name: '' },
            selectedSide: { name: '' },
            price: null,
            quantity: null,
          };

          this.messageservice.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order was placed successfully',
          });

        },
        error: (error) => {
          console.log(error)
          this.messageservice.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.error?.detail || 'Failed to place order, Try again'}`,
          });
          if (error.status === 404) {
            console.error('Not Found');
          } else {
            console.error(error.message);
          }
        },
      });

    // this.orderservice
    //   .placeOrder({
    //     portfolioId: this.formdata.selectedPortfolio.id,
    //     product: this.selectedProduct,
    //     type: this.selectedType,
    //     side: this.selectedSide,
    //     price: this.price,
    //     quantity: this.quantity,
    //     userId: this.authservice.getUserId(),
    //   })
    //   .subscribe({
    //     next: (result) => {
    //       this.messageservice.add({
    //         severity: 'success',
    //         summary: 'Success',
    //         detail: 'Order was placed successfully',
    //       });
    //     },
    //     error: (error) => {
    //       if (error.status === 404) {
    //         console.error('Not Found');
    //       } else {
    //         console.error(error.message);
    //       }
    //     },
    //   });

    // this.orderservice.placeOrder();
  }
}
