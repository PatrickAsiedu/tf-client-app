import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = ` ${environment.baseURL}/user-service`;

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.baseUrl}/users/me`);
  }

  getAllUsers() {
    return this.http.get(`${this.baseUrl}/users`);
  }
}
