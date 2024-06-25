import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatechequeComponent } from './updatecheque.component';

describe('UpdatechequeComponent', () => {
  let component: UpdatechequeComponent;
  let fixture: ComponentFixture<UpdatechequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatechequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatechequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
