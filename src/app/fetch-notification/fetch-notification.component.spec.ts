import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchNotificationComponent } from './fetch-notification.component';

describe('FetchNotificationComponent', () => {
  let component: FetchNotificationComponent;
  let fixture: ComponentFixture<FetchNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
