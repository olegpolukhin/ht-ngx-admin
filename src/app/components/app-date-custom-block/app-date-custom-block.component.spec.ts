import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppDateCustomBlockComponent } from './app-date-custom-block.component';

describe('AppDaterangePickerComponent', () => {
  let component: AppDateCustomBlockComponent;
  let fixture: ComponentFixture<AppDateCustomBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppDateCustomBlockComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDateCustomBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
