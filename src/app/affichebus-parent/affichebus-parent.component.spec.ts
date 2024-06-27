import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichebusParentComponent } from './affichebus-parent.component';

describe('AffichebusParentComponent', () => {
  let component: AffichebusParentComponent;
  let fixture: ComponentFixture<AffichebusParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichebusParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichebusParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
