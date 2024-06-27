import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAcctiviteComponent } from './ajout-acctivite.component';

describe('AjoutAcctiviteComponent', () => {
  let component: AjoutAcctiviteComponent;
  let fixture: ComponentFixture<AjoutAcctiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutAcctiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutAcctiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
