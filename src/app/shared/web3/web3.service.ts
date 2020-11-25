import {Injectable} from "@angular/core";
import Web3 from "web3";
import {BehaviorSubject, Observable} from "rxjs";
import {primitiveArrayEquals} from "@shared/primitive-array-equals";

/**
 * A service that publishes a web3 object and various blockchain related functionalities.
 */
@Injectable({
    providedIn: "root"
})
export class Web3Service {

    /**
     * Instance of the Web3 API, available publicly.
     */
    web3: Web3;
    private updatedEveryMs = 1000;

    constructor() {
        const provider = (window.ethereum) ? window.ethereum : Web3.givenProvider;
        this.web3 = new Web3(provider);

        if (provider) {
            setInterval(async () => {
                const newAccounts = await this.web3.eth.getAccounts();

                if (!primitiveArrayEquals(this._accounts, newAccounts)) {
                    this.accountsSubject.next(newAccounts);
                }

                this._accounts = newAccounts;
            }, this.updatedEveryMs);
        } else {
            console.warn("No Web3 provider found!");
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
        const balanceString = await this.web3.eth.getBalance(address);
        return Number(balanceString);
    }
}
