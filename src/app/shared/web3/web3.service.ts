import {Injectable} from "@angular/core";
import Web3 from "web3";

@Injectable({
    providedIn: "root"
})
export class Web3Service {

    web3: Web3;

    constructor() {
        try {
            const provider = (window.ethereum) ? window.ethereum : Web3.givenProvider;
            this.web3 = new Web3(provider);
        } catch (err) {
            throw new Error("Non-Ethereum browser detected. You should consider trying Mist or MetaMask!");
        }
    }
}
