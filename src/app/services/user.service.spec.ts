import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController : HttpTestingController
  let baseUrl: string

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[provideHttpClient(),provideHttpClientTesting()]});
    service = TestBed.inject(UserService);
    httpTestingController= TestBed.inject(HttpTestingController)
    baseUrl=` ${environment.baseURL}/user-service`
   
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user profile',()=>{
    service.getProfile().subscribe();
    const req = httpTestingController.expectOne(`${baseUrl}/users/me`)
    expect(req.request.method).toBe('GET');

  })


  afterEach(()=>{
    httpTestingController.verify()
   
  })
});
