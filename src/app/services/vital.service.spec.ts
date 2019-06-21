import { TestBed } from '@angular/core/testing';

import { VitalService } from './vital.service';

describe('VitalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VitalService = TestBed.get(VitalService);
    expect(service).toBeTruthy();
  });
});
