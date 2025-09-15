import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NongridcontainerComponent } from './nongridcontainer.component';

describe('NongridcontainerComponent', () => {
  let component: NongridcontainerComponent;
  let fixture: ComponentFixture<NongridcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NongridcontainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NongridcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
