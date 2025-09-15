import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';

interface RegisterResponse {
  success: boolean;
  message: string;
}

interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseURL;
  private registerUrl = `${this.baseUrl}/user-service/auth/register`;
  private loginUrl = `${this.baseUrl}/user-service/auth/login`;
  private profileUrl = `${this.baseUrl}/user-service/users/me`;
  private token: string | null = null;
  private user: User = {};

  constructor(private http: HttpClient, private router: Router) {
    // this.token = localStorage.getItem('token');
    // this.user = localStorage.getItem('user') as User;
  }

  register(
    email: string,
    name: string,
    password: string
  ): Observable<RegisterResponse> {
    const body = { email, name, password };
    return this.http.post<RegisterResponse>(this.registerUrl, body);
  }

  verifyEmail(emailToken:string):Observable<RegisterResponse>{
    return this.http.patch<RegisterResponse>(`${this.baseUrl}/user-service/auth/verify/${emailToken}`,emailToken)
  }
  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post<LoginResponse>(this.loginUrl, body).pipe(
      tap((response) => {
        this.token = response.token;
        // console.log(this.token);
        localStorage.setItem('token', this.token);
    
      }),
      switchMap(() => this.getUserProfile()),
      tap((user) => {
        const { id, role } = user;
        this.user = { id, role };
        localStorage.setItem('user', JSON.stringify(user));
        if(role ==='USER'){
          this.router.navigate(['/']);

        }else{
          this.router.navigate(['/admin/dashboard']);

        }
  
        // console.log(this.user);
      })
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.profileUrl);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }

  getUserId() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    this.token = null;
    this.user = {};
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }
}
