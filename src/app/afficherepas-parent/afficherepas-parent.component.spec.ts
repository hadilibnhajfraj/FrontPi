import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherepasParentComponent } from './afficherepas-parent.component';

describe('AfficherepasParentComponent', () => {
  let component: AfficherepasParentComponent;
  let fixture: ComponentFixture<AfficherepasParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherepasParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherepasParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
