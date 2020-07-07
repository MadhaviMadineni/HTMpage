import { TestBed } from '@angular/core/testing';

import { PumpService } from './pump.service';

describe('PumpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PumpService = TestBed.get(PumpService);
    expect(service).toBeTruthy();
  });
});
