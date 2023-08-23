import { TestBed } from '@angular/core/testing';

import { TestRouteServiceService } from './test-route-service.service';

describe('TestRouteServiceService', () => {
  let service: TestRouteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestRouteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
