import {Injectable} from "@angular/core";
import {Web3Service} from "@shared/web3/web3.service";
import PlainAdvance from "@contracts/PlainAdvance.json";
import DoubleAdvance from "@contracts/DoubleAdvance.json";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";

const contract = require("@truffle/contract");
const ETH_TO_WEI = 10 ** 18;

@Injectable({
    providedIn: "root"
})
export class OfferContractService {

    constructor(private web3Service: Web3Service,
                private loggedInUserService: LoggedInUserService) {
    }

    async createPlainAdvanceContract(
            buyerAddress: string,
            sellerAddress: string,
            priceInEth: number,
            advanceInEth: number) {
        const loggedInUser = this.loggedInUserService.authenticatedUser;

        if (loggedInUser === null) {
            throw new Error("User must be logged in to create contract!");
        }

        if (loggedInUser.ethereumAddress === null) {
            throw new Error("User must have an Ethereum address to create a contract!");
        }

        // TODO: multiple accounts?
        if (this.web3Service.currentAccounts[0] !== loggedInUser.ethereumAddress) {
            console.log(this.web3Service.currentAccounts);
            console.log(loggedInUser.ethereumAddress);
            throw new Error("User must be logged in to their Ethereum account to initiate the transaction!");
        }

        if (loggedInUser.ethereumAddress !== sellerAddress
            && loggedInUser.ethereumAddress !== buyerAddress) {
            throw new Error("Only buyer or seller may initiate the transaction!");
        }

        const contractAbstraction = contract(PlainAdvance);
        contractAbstraction.setProvider(this.web3Service.web3.currentProvider);

        return await contractAbstraction.new(
            sellerAddress,
            buyerAddress,
            (priceInEth * ETH_TO_WEI).toString(),
            (advanceInEth * ETH_TO_WEI).toString(),
            {from: loggedInUser.ethereumAddress});
    }

    async createDoubleAdvanceContract(
            buyerAddress: string,
            sellerAddress: string,
            priceInEth: number) {
        const contractAbstraction = contract(DoubleAdvance);
        contractAbstraction.setProvider(this.web3Service.web3.currentProvider);

        return contractAbstraction.new(
            sellerAddress,
            buyerAddress,
            priceInEth * ETH_TO_WEI,
            {from: this.web3Service.currentAccounts[0]});
    }
}
