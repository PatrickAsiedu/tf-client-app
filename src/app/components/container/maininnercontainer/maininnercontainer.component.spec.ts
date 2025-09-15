import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaininnercontainerComponent } from './maininnercontainer.component';

describe('MaininnercontainerComponent', () => {
  let component: MaininnercontainerComponent;
  let fixture: ComponentFixture<MaininnercontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaininnercontainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaininnercontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
