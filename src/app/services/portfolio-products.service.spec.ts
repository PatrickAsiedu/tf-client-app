import { TestBed } from '@angular/core/testing';

import { PortfolioProductsService } from './portfolio-products.service';

describe('PortfolioProductsService', () => {
  let service: PortfolioProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
