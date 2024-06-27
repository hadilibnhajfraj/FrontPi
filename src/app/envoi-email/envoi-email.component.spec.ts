import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiEmailComponent } from './envoi-email.component';

describe('EnvoiEmailComponent', () => {
  let component: EnvoiEmailComponent;
  let fixture: ComponentFixture<EnvoiEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvoiEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
