import {TestBed} from "@angular/core/testing";

import {Web3Service} from "@shared/web3/web3.service";

describe("Web3Service", () => {
    let service: Web3Service;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(Web3Service);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
