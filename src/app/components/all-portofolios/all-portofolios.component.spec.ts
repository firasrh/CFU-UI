import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPortofoliosComponent } from './all-portofolios.component';

describe('AllPortofoliosComponent', () => {
  let component: AllPortofoliosComponent;
  let fixture: ComponentFixture<AllPortofoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPortofoliosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPortofoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
