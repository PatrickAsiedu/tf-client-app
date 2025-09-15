import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment.development';
import { ProductHistory } from '../models/product-history';
import { ProductHistoryChartData } from '../models/product-history-chart-data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.baseURL}/market-data-service`;
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductHistoryByProductId(id: string): Observable<ProductHistory[]> {
    return this.http.get<ProductHistory[]>(
      `${this.baseUrl}/product-history/${id}`
    );
  }

  getProductHistories(): Observable<ProductHistory[]> {
    return this.http.get<ProductHistory[]>(
      `${this.baseUrl}/product-history/`
    );
  }

  getChartData(): Observable<ProductHistoryChartData> {
    return this.http.get<ProductHistoryChartData>(`${this.baseUrl}/product-history/chart-data`)
  }

  transformProductHistory(id: string):Promise<ProductHistory[]> {
    const payloadd =this.http.get<ProductHistory[]>(
      `${this.baseUrl}/product-history/${id}`).pipe(
        tap((payload: ProductHistory[]) =>
          payload.map((item) => [item.createdAt, item.lastTradedPrice])
        )
      );
      return firstValueFrom(payloadd)
   
  }

  addIconsToProducts(ticker: string) {
    const tickerDomainMap: { [ticker: string]: string } = {
      MSFT: 'microsoft.com',
      NFLX: 'netflix.com',
      GOOGL: 'google.com',
      AAPL: 'apple.com',
      TSLA: 'tesla.com',
      IBM: 'ibm.com',
      ORCL: 'oracle.com',
      AMZN: 'amazon.com',
    };

    const domain = tickerDomainMap[ticker];
    if (domain) {
      return `https://logo.clearbit.com/${domain}`;
    }
    return '';
  }

  addNameToProducts(ticker: string) {
    const tickerNameMap: { [ticker: string]: string } = {
      MSFT: 'Microsoft',
      NFLX: 'Netflix.com',
      GOOGL: 'Google',
      AAPL: 'Apple',
      TSLA: 'Tesla',
      IBM: 'Ibm',
      ORCL: 'Oracle',
      AMZN: 'Amazon',
    };

    const name = tickerNameMap[ticker];
    if (name) {
      return `${name}`;
    }
    return '';
  }

  addColorToProducts(ticker: string) {
    const colourMap: { [ticker: string]: string } = {
      MSFT: '#0078D4', // Microsoft
      NFLX: '#E50914', // Netflix
      GOOGL: '#4285F4', // Google
      AAPL: '#A2AAAD', // Apple
      TSLA: '#CC0000', // Tesla
      IBM: '#054ADA', // IBM
      ORCL: '#F80000', // Oracle
      AMZN: '#FF9900', // Amazon
    };

    const color = colourMap[ticker];
    if (color) {
      return `${color}`;
    }
    return '';
  }
}
