import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifRepasComponent } from './modif-repas.component';

describe('ModifRepasComponent', () => {
  let component: ModifRepasComponent;
  let fixture: ComponentFixture<ModifRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifRepasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
