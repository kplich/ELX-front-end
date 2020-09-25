import {Injectable} from "@angular/core";
import contract from "truffle-contract";
import {Web3Service} from "@shared/web3/web3.service";
import {OfferType} from "@conversation/data/OfferType";

declare let require: any;
const plainAdvanceArtifacts = require("../../../../../../blockchain/build/contracts/PlainAdvance.json");
const doubleAdvanceArtifacts = require("../../../../../../blockchain/build/contracts/DoubleAdvance.json");

@Injectable({
    providedIn: "root"
})
export class OfferContractService {

    private static readonly OFFER_TYPES = new Map<OfferType, any>([
        [OfferType.PLAIN_ADVANCE, require("../../../../../../blockchain/build/contracts/PlainAdvance.json")],
        [OfferType.DOUBLE_ADVANCE, require("../../../../../../blockchain/build/contracts/DoubleAdvance.json")]
    ]);

    constructor(private web3Service: Web3Service) {
    }

    async createContract() {
        if (window.ethereum) {
            const contractAbstraction = contract(plainAdvanceArtifacts);
            contractAbstraction.setProvider(this.web3Service.web3.currentProvider);

            const createdContract = contractAbstraction.new("0x54BF75cB26D30f274604d2029283FFaD52503BC4", "0x10dbeCf5F27F215E831333998D23c24008c6F285", 2, 1, {from: this.web3Service.currentAccounts[0]});
            return createdContract;
        }
        else {
            return null;
        }
    }
}
