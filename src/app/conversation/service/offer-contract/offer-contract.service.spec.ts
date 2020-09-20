import {TestBed} from '@angular/core/testing';

import {OfferContractService} from './offer-contract.service';

describe("OfferContractService", () => {
  let service: OfferContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferContractService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
