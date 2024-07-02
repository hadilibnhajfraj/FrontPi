import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChequeComponent } from './list-cheque.component';

describe('ListChequeComponent', () => {
  let component: ListChequeComponent;
  let fixture: ComponentFixture<ListChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
