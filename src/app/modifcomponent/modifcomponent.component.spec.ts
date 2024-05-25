import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifcomponentComponent } from './modifcomponent.component';

describe('ModifcomponentComponent', () => {
  let component: ModifcomponentComponent;
  let fixture: ComponentFixture<ModifcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
