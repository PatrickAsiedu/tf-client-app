import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { OrderDto } from '../models/order-dto';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = `${environment.baseURL}/order-service/api`;

  constructor(private http: HttpClient) {}

  placeOrder(formdata: any): Observable<OrderDto> {
    const body = formdata;
    // console.log(body);

    return this.http.post<OrderDto>(`${this.baseUrl}/orders/save`, body);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  getOrdersByUserId(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/user/${id}`);
  }

  filterOrdersByStatus(orders: Order[]) {
    const openOrders: Order[] = [];
    const pendingOrders: Order[] = [];
    const cancelledOrders: Order[] = [];
    const filledOrders: Order[] = [];

    orders.forEach((order) => {
      switch (order.status) {
        case 'OPEN':
          openOrders.push(order);
          break;
        case 'CANCELLED':
          cancelledOrders.push(order);
          break;
        case 'FILLED':
          filledOrders.push(order);
          break;
        case 'PENDING':
          pendingOrders.push(order);
          break;
   
        default:
          break;
      }
    });
  
    return { openOrders, cancelledOrders, filledOrders, pendingOrders };
  }

  // cancelOrders(): Observable<placeOrderResponse> {
  //   const body = {};

  //   return this.http.post<placeOrderResponse>(this.baseUrl, body);
  // }
}
