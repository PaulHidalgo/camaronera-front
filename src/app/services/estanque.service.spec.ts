import { TestBed } from '@angular/core/testing';

import { EstanqueService } from './estanque.service';

describe('EstanqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstanqueService = TestBed.get(EstanqueService);
    expect(service).toBeTruthy();
  });
});
