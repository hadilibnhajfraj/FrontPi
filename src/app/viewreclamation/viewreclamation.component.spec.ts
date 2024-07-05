import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreclamationComponent } from './viewreclamation.component';

describe('ViewreclamationComponent', () => {
  let component: ViewreclamationComponent;
  let fixture: ComponentFixture<ViewreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewreclamationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
