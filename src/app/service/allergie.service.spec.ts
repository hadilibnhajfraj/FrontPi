import { TestBed } from '@angular/core/testing';

import { AllergieService } from './allergie.service';

describe('AllergieService', () => {
  let service: AllergieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
