import { TestBed } from '@angular/core/testing';

import { SeDesService } from './se-des.service';

describe('SeDesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeDesService = TestBed.get(SeDesService);
    expect(service).toBeTruthy();
  });
});
