import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusafficheComponent } from './busaffiche.component';

describe('BusafficheComponent', () => {
  let component: BusafficheComponent;
  let fixture: ComponentFixture<BusafficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusafficheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusafficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
