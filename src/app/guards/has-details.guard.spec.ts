import { TestBed } from '@angular/core/testing';

import { HasDetailsGuard } from './has-details.guard';

describe('HasDetailsGuard', () => {
  let guard: HasDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
