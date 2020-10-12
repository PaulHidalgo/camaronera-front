import { TestBed } from '@angular/core/testing';

import { GranjaService } from './granja.service';

describe('GranjaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GranjaService = TestBed.get(GranjaService);
    expect(service).toBeTruthy();
  });
});
