import { TestBed } from '@angular/core/testing';

import { DefaultMenuSettingService } from './default-menu-setting.service';

describe('DefaultMenuSettingService', () => {
  let service: DefaultMenuSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultMenuSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
