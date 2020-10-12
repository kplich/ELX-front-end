import {Injectable} from "@angular/core";
import Web3 from "web3";
import {BehaviorSubject} from "rxjs";
import {primitiveArrayEquals} from "@shared/primitive-array-equals";

@Injectable({
    providedIn: "root"
})
export class Web3Service {

    web3: Web3;

    private accounts: string[] = [];
    accounts$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.accounts);

    constructor() {
        console.log("Creating Web3Service");
        try {
            const provider = (window.ethereum) ? window.ethereum : Web3.givenProvider || "ws://localhost:8545";
            this.web3 = new Web3(provider);
        } catch (err) {
            throw new Error("Non-Ethereum browser detected. You should consider trying Mist or MetaMask!");
        }

        setInterval(async () => {
            const newAccounts = await this.web3.eth.getAccounts();

            if (!primitiveArrayEquals(this.accounts, newAccounts)) {
                console.log("new accounts found: ", newAccounts);
                this.accounts$.next(newAccounts);
            }

            this.accounts = newAccounts;
        }, 1000);
    }

    get currentAccounts(): string[] {
        return this.accounts;
    }

    async getBalance(address: string): Promise<number> {
        const balanceString = await this.web3.eth.getBalance(address);
        return Number(balanceString);
    }
}
