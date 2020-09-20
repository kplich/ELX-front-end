import {Inject, Injectable} from '@angular/core';
import {WEB3} from '@shared/web3-token';
import Web3 from 'web3';
import contract from 'truffle-contract';

declare let require: any;
const plainAdvanceArtifacts = require("../../../../../../blockchain/build/contracts/PlainAdvance.json");

@Injectable({
    providedIn: "root"
})
export class OfferContractService {

    constructor(@Inject(WEB3) private web3: Web3) {
        console.log(web3);
    }

    async createContract() {
        if (window.ethereum) {
            await window.ethereum.enable();
            console.log("ethereum enabled!");
            const accounts = await this.web3.eth.getAccounts();
            console.log(accounts);
            this.web3.eth.defaultAccount = accounts[0];

            const contractAbstraction = contract(plainAdvanceArtifacts);
            contractAbstraction.setProvider(this.web3.currentProvider);

            const createdContract = contractAbstraction.new("0x758b461Cc1bcEe4C153f88ED1a823502ac1bd125", "0x10dbeCf5F27F215E831333998D23c24008c6F285", 2, 1, {from: accounts[0]});
            return createdContract;
        }
        else {
            return null;
        }
    }
}
