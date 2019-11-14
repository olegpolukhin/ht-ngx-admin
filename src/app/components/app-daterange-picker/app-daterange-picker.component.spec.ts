import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDaterangePickerComponent } from './app-daterange-picker.component';

describe('AppDaterangePickerComponent', () => {
  let component: AppDaterangePickerComponent;
  let fixture: ComponentFixture<AppDaterangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDaterangePickerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDaterangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
