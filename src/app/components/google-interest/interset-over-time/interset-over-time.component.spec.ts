import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntersetOverTimeComponent } from './interset-over-time.component';

describe('IntersetOverTimeComponent', () => {
  let component: IntersetOverTimeComponent;
  let fixture: ComponentFixture<IntersetOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntersetOverTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntersetOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
