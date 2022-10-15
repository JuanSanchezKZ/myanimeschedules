import { TestBed } from '@angular/core/testing';

import { AnimeguardGuard } from './animeguard.guard';

describe('AnimeguardGuard', () => {
  let guard: AnimeguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnimeguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
