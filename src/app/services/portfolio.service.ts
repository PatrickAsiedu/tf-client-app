import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.baseURL}/order-service/api`;

  createPortfolio(name:string,userId:string) {
    const body ={name, userId}
    return this.http.post(`${this.baseUrl}/portfolios/create`,body)
  }

  getPortfoliosByUser(id: string): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.baseUrl}/portfolios/user/${id}`);
  }

  getAllPortfolios() {}

  getPortolioById(id: string): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.baseUrl}/portfolios/${id}`);
  }

  closePortfolio() {}
}
