import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootlayoutComponent } from './rootlayout.component';

describe('RootlayoutComponent', () => {
  let component: RootlayoutComponent;
  let fixture: ComponentFixture<RootlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
