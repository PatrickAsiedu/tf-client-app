// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { PortfoliosComponent } from './portfolios.component';

// describe('PortfoliosComponent', () => {
//   let component: PortfoliosComponent;
//   let fixture: ComponentFixture<PortfoliosComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [PortfoliosComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(PortfoliosComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Portfolio } from '../../models/portfolio';
import { PortfolioService } from '../../services/portfolio.service';
import { environment } from '../../../environments/environment.development';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PortfolioService]
    });

    service = TestBed.inject(PortfolioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a portfolio', () => {
    const mockResponse = { message: 'Portfolio created successfully' };
    const name = 'Test Portfolio';
    const userId = 'user123';
    const isDefault = true;

    service.createPortfolio(name, userId, isDefault).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseURL}/order-service/api/portfolios/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name, userId, isdefault: isDefault });

    req.flush(mockResponse);  // Respond with the mock data
  });

  it('should fetch portfolios by user ID', () => {
    const mockPortfolios: Portfolio[] = [
      { id: '1', name: 'Portfolio 1', userId: 'user123', isdefault: true },
      { id: '2', name: 'Portfolio 2', userId: 'user123', isdefault: false }
    ];

    service.getPortfoliosByUser('user123').subscribe((portfolios: string | any[]) => {
      expect(portfolios.length).toBe(2);
      expect(portfolios).toEqual(mockPortfolios);
    });

    const req = httpMock.expectOne(`${environment.baseURL}/order-service/api/portfolios/user/user123`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPortfolios);  // Respond with the mock data
  });

  it('should fetch portfolio by ID', () => {
    const mockPortfolio: Portfolio = { id: '1', name: 'Portfolio 1', userId: 'user123', isdefault: true };

    service.getPortolioById('1').subscribe((portfolio: any) => {
      expect(portfolio).toEqual(mockPortfolio);
    });

    const req = httpMock.expectOne(`${environment.baseURL}/order-service/api/portfolios/1`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPortfolio);  // Respond with the mock data
  });
});

