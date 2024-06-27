import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasaffichageComponent } from './repasaffichage.component';

describe('RepasaffichageComponent', () => {
  let component: RepasaffichageComponent;
  let fixture: ComponentFixture<RepasaffichageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepasaffichageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepasaffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
