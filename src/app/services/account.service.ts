import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountTopUpDto } from '../models/account-topuo-dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = `${environment.baseURL}/user-service`;

  constructor(private http: HttpClient) { }

  topUpAccount(dto: AccountTopUpDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/accounts/top-up`, dto);
  }

}
