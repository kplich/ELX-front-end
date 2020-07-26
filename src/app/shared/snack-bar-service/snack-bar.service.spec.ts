import {TestBed} from '@angular/core/testing';

import {SnackBarService} from './snack-bar.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackBarService, MatSnackBar],
      imports: [MatSnackBarModule]
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
