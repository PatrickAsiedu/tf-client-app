import { Component, OnInit } from '@angular/core';
import { MaincontainerComponent } from '../../components/container/maincontainer/maincontainer.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NongridcontainerComponent } from '../../components/container/nongridcontainer/nongridcontainer.component';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

interface Column {
  field: string;
  header: string;
}

interface Products {
  name: string;
  price: number;
  category: string;
  quantity: number;
  status: string;
  reviews: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MaincontainerComponent,
    TableModule,
    TagModule,

    CommonModule,
    FormsModule,
    NongridcontainerComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  constructor(
    private orderservice: OrderService,
    private authservice: AuthService
  ) {}
  ngOnInit(): void {
    this.orderservice
      .getOrdersByUserId(this.authservice.getUserId())
      .subscribe({
        next: (result) => {
          this.orders = result;
          console.log(this.orders);
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

  // orders: Order[] = [];
  cols = [
    { field: 'product', header: 'Product' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'price', header: 'Price' },
    { field: 'side', header: 'Side' },
    { field: 'type', header: 'Type' },
    { field: 'status', header: 'Status' },
    { field: 'fulfilled', header: 'Fulfilled' },
    { field: 'dateCreated', header: 'DateCreated' },
  ];
  orders: Order[] = [
   
  ];

  getSeverity(status: string) {
    switch (status) {
      case 'FILLED':
        return 'success';
      case 'PARTIALLY_FILLED':
        return 'info';
      case 'PENDING':
        return 'warning';
      case 'FAILED':
        return 'danger';
      case 'CANCELLED':
        return 'danger';
      default:
        return undefined;
    }
  }
}
