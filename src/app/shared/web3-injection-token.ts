import {InjectionToken} from "@angular/core";
import Web3 from "web3";

export const WEB3 = new InjectionToken<Web3 | null>("web3", {
    providedIn: "root",
    factory: () => {
        const provider = window.ethereum ? window.ethereum : Web3.givenProvider;
        if (provider) {
            return new Web3(provider);
        }
        else {
            console.warn("Non-Ethereum browser detected. You should consider trying Mist or MetaMask!");
            return null;
        }
    }
});
