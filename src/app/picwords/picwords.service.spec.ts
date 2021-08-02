import { TestBed } from '@angular/core/testing';

import { PicwordsService } from './picwords.service';

describe('PicwordsService', () => {
  let service: PicwordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicwordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
