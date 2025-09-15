import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { PortfolioProduct } from '../models/portfolio-product';

@Injectable({
  providedIn: 'root'
})
export class PortfolioProductsService {

  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.baseURL}/order-service/api`;

  getPortfoliosProducts(id: string): Observable<PortfolioProduct[]> {
    return this.http.get<PortfolioProduct[]>(`${this.baseUrl}/portfolio-products/${id}`);
  }
}
