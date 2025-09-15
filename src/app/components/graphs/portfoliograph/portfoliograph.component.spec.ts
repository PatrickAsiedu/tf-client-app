import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliographComponent } from './portfoliograph.component';

describe('PortfoliographComponent', () => {
  let component: PortfoliographComponent;
  let fixture: ComponentFixture<PortfoliographComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfoliographComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfoliographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
