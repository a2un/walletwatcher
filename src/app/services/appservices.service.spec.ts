import { TestBed, inject } from '@angular/core/testing';

import { AppservicesService } from './appservices.service';

describe('AppservicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppservicesService]
    });
  });

  it('should be created', inject([AppservicesService], (service: AppservicesService) => {
    expect(service).toBeTruthy();
  }));
});
