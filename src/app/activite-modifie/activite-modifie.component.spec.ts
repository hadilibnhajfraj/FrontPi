import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteModifieComponent } from './activite-modifie.component';

describe('ActiviteModifieComponent', () => {
  let component: ActiviteModifieComponent;
  let fixture: ComponentFixture<ActiviteModifieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteModifieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteModifieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
