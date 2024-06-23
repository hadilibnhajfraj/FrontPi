import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchActiviteComponent } from './fetch-activite.component';

describe('FetchActiviteComponent', () => {
  let component: FetchActiviteComponent;
  let fixture: ComponentFixture<FetchActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchActiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
