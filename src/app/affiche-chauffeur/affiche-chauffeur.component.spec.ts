import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheChauffeurComponent } from './affiche-chauffeur.component';

describe('AfficheChauffeurComponent', () => {
  let component: AfficheChauffeurComponent;
  let fixture: ComponentFixture<AfficheChauffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheChauffeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
