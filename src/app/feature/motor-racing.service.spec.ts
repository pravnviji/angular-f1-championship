import { TestBed } from '@angular/core/testing';

import { MotorRacingService } from './motor-racing.service';

describe('MotorRacingService', () => {
  let service: MotorRacingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorRacingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
