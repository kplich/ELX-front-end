import {Component, OnInit, Input} from "@angular/core";
import {ContractStateString, contractStateToString} from "@my-account/data/ContractState";
import {Web3Service} from "@shared/web3/web3.service";

export const STRINGS = {
    labels: {
        address: "Contract address",
        status: "Contract status",
        balance: "Balance"
    }
};

@Component({
    selector: "item-sold-contract-details",
    templateUrl: "./item-sold-contract-details.component.html",
    styleUrls: ["./item-sold-contract-details.component.scss"]
})
export class ItemSoldContractDetailsComponent implements OnInit {

    strings = STRINGS;

    @Input() contractAddress: string | undefined;
    @Input() contract: any;

    balance!: number;
    state!: ContractStateString;

    constructor(private web3Service: Web3Service) {
    }

    async ngOnInit() {
        if (this.contractAddress) {
            this.balance = await this.web3Service.getBalance(this.contractAddress);
        }
        else {
            console.warn("contract address is undefined!");
        }
        this.state = contractStateToString((await this.contract.state()).toNumber());
    }

}
