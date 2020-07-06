import { TestBed } from '@angular/core/testing';

import { IdentityManagementService } from './identity-management.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('IdentityManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientTestingModule]}));

  it('should be created', () => {
    const service: IdentityManagementService = TestBed.get(IdentityManagementService);
    expect(service).toBeTruthy();
  });
});
