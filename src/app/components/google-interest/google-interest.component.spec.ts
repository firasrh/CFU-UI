import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleInterestComponent } from './google-interest.component';

describe('GoogleInterestComponent', () => {
  let component: GoogleInterestComponent;
  let fixture: ComponentFixture<GoogleInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
