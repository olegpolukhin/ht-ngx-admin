import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteActivityComponent } from './site-activity.component';

describe('SiteActivityComponent', () => {
  let component: SiteActivityComponent;
  let fixture: ComponentFixture<SiteActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteActivityComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
