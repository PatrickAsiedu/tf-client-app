import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { Order } from '../../../models/order';
import { MaincontainerComponent } from "../../../components/container/maincontainer/maincontainer.component";
import { NongridcontainerComponent } from "../../../components/container/nongridcontainer/nongridcontainer.component";
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [MaincontainerComponent, NongridcontainerComponent,  TableModule,
    TagModule,CommonModule],
  templateUrl: './trades.component.html',
  styleUrl: './trades.component.scss'
})
export class TradesComponent implements OnInit {
  constructor(
    private orderservice: OrderService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.orderservice
      .getOrdersByUserId(this.authservice.getUserId())
      .subscribe({
        next: (result) => {
          // this.orders = result;
          // console.log(this.orders)
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
    {
      dateCreated: '2024-08-01T12:00:00Z',
      description: 'Buy order for tech stocks',
      id: '1',
      portfolio: { id: 'portfolio1', name: 'Tech Portfolio' },
      price: 150.0,
      product: { ticker: 'AAPL' },
      quantity: 10,
      side: 'BUY',
      status: 'PENDING',
      type: 'LIMIT',
      userId: 'user123',
    },
    {
      dateCreated: '2024-08-02T14:30:00Z',
      description: 'Sell order for energy stocks',
      id: '2',
      portfolio: { id: 'portfolio2', name: 'Energy Portfolio' },
      price: 75.0,
      product: { ticker: 'XOM' },
      quantity: 5,
      side: 'SELL',
      status: 'OPEN',
      type: 'MARKET',
      userId: 'user456',
    },
    {
      dateCreated: '2024-08-03T09:00:00Z',
      description: 'Buy order for healthcare stocks',
      id: '3',
      portfolio: { id: 'portfolio3', name: 'Healthcare Portfolio' },
      price: 200.0,
      product: { ticker: 'JNJ' },
      quantity: 8,
      side: 'BUY',
      status: 'FILLED',
      type: 'LIMIT',
      userId: 'user789',
    },
    {
      dateCreated: '2024-08-04T16:45:00Z',
      description: 'Sell order for financial stocks',
      id: '4',
      portfolio: { id: 'portfolio4', name: 'Financial Portfolio' },
      price: 100.0,
      product: { ticker: 'JPM' },
      quantity: 12,
      side: 'SELL',
      status: 'PARTIALLY_FILLED',
      type: 'MARKET',
      userId: 'user101',
    },
    {
      dateCreated: '2024-08-05T11:20:00Z',
      description: 'Buy order for consumer goods',
      id: '5',
      portfolio: { id: 'portfolio5', name: 'Consumer Goods Portfolio' },
      price: 50.0,
      product: { ticker: 'PG' },
      quantity: 15,
      side: 'BUY',
      status: 'CANCELLED',
      type: 'LIMIT',
      userId: 'user202',
    },
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
