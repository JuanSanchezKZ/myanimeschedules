import { TestBed } from '@angular/core/testing';

import { GetAnimeService } from './getanime.service';

describe('GetAnimeService', () => {
  let service: GetAnimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAnimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
