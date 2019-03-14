import { TestBed } from '@angular/core/testing';

import { DcService } from './dc.service';

describe('DcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DcService = TestBed.get(DcService);
    expect(service).toBeTruthy();
  });
});
