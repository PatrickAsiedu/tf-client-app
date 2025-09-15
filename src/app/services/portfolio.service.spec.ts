import { TestBed } from '@angular/core/testing';

import { PortfolioService } from './portfolio.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';
import { provideHttpClient } from '@angular/common/http';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let httpTestingController: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PortfolioService);
    httpTestingController = TestBed.inject(HttpTestingController);
    baseUrl = ` ${environment.baseURL}/user-service`;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
