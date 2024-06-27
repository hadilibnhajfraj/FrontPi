import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifchauffeurComponent } from './modifchauffeur.component';

describe('ModifchauffeurComponent', () => {
  let component: ModifchauffeurComponent;
  let fixture: ComponentFixture<ModifchauffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifchauffeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifchauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
