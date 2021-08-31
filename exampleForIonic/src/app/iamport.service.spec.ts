import { TestBed } from '@angular/core/testing';

import { IamportService } from './iamport.service';

describe('IamportService', () => {
  let service: IamportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IamportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
