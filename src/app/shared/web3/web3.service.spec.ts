import {TestBed, fakeAsync, flush} from "@angular/core/testing";
import {Web3Service} from "@shared/web3/web3.service";
import {WEB3} from "@shared/web3-injection-token";
import {take, skip} from "rxjs/operators";

describe("Web3Service", () => {
    let service: Web3Service;

    const web3Mock = {
        eth: {
            getAccounts: () => {
                return Promise.resolve(["account"]);
            },
            getBalance: (address: string) => {
                return Promise.resolve("1");
            }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: WEB3, useValue: web3Mock}
            ]
        });
        service = TestBed.inject(Web3Service);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    // does not work as expected in fakeAsync zone
    xit("should return correct accounts", fakeAsync(() => {
        service.accounts$.pipe(skip(5), take(1)).subscribe(accounts => {
            expect(accounts.length).toEqual(1);
        });
        flush();
    }));

    // does not work as expected in fakeAsync zone
    xit("should return correct balance", fakeAsync( () => {
        service.getBalance("any").then(balance => {
            expect(balance).toEqual(1);
        });
        flush();
    }));
});
