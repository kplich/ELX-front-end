import {Injectable, Inject} from "@angular/core";
import Web3 from "web3";
import {BehaviorSubject, Observable} from "rxjs";
import {primitiveArrayEquals} from "@shared/primitive-array-equals";
import {WEB3} from "@shared/web3-injection-token";

/**
 * A service that publishes a web3 object and various blockchain related functionalities.
 */
@Injectable({
    providedIn: "root"
})
export class Web3Service {

    private updatedEveryMs = 1000;

    constructor(@Inject(WEB3) public web3: Web3 | null) {
        if (this.web3 !== null) {
            setInterval(async () => {
                if (this.web3 !== null) {
                    const newAccounts = await this.web3.eth.getAccounts();

                    if (!primitiveArrayEquals(this._accounts, newAccounts)) {
                        this.accountsSubject.next(newAccounts);
                    }

                    this._accounts = newAccounts;
                }
            }, this.updatedEveryMs);
        }
    }

    // tslint:disable-next-line:variable-name
    private _accounts: string[] = [];

    private accountsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this._accounts);

    /**
     * Returns accounts logged in an the moment as a primitive array.
     */
    get accounts(): string[] {
        return this._accounts;
    }

    /**
     * Returns accounts logged in as an Observable.
     */
    get accounts$(): Observable<string[]> {
        return this.accountsSubject.asObservable();
    }

    /**
     * Gets the balance of an address.
     * @param address an Ethereum address
     * @return balance of the address as a Number
     */
    async getBalance(address: string): Promise<number> {
        if (this.web3 !== null) {
            const balanceString = await this.web3.eth.getBalance(address);
            return Number(balanceString);
        }
        else {
            throw new Error("no web3 provided!");
        }
    }
}
