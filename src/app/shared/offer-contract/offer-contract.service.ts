import {Injectable} from "@angular/core";
import {Web3Service} from "@shared/web3/web3.service";
import PlainAdvance from "@contracts/PlainAdvance.json";
import DoubleAdvance from "@contracts/DoubleAdvance.json";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {SimpleUser} from "@my-account/data/SimpleUser";
import {OfferType} from "@conversation/data/OfferType";

const contract = require("@truffle/contract");

/**
 * Conversion rate from Ethers to Wei (1 Ether = 10^18 Wei.)
 */
export const ETH_TO_WEI = 10 ** 18;

/**
 * A service for creating new and fetching the existing smart contracts.
 */
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
        if (this.web3Service.web3 !== null) {
            const loggedInUser =
                this.getUserWithConditions(this.loggedInUserService.authenticatedUser, buyerAddress, sellerAddress);


            const contractAbstraction = contract(PlainAdvance);
            contractAbstraction.setProvider(this.web3Service.web3.currentProvider);

            return await contractAbstraction.new(
                sellerAddress,
                buyerAddress,
                (priceInEth * ETH_TO_WEI).toString(),
                (advanceInEth * ETH_TO_WEI).toString(),
                {from: loggedInUser.ethereumAddress});
        } else {
            return null;
        }
    }

    async createDoubleAdvanceContract(
        buyerAddress: string,
        sellerAddress: string,
        priceInEth: number) {
        if (this.web3Service.web3 !== null) {
            const loggedInUser
                = this.getUserWithConditions(this.loggedInUserService.authenticatedUser, buyerAddress, sellerAddress);


            const contractAbstraction = contract(DoubleAdvance);
            contractAbstraction.setProvider(this.web3Service.web3.currentProvider);

            return contractAbstraction.new(
                sellerAddress,
                buyerAddress,
                (priceInEth * ETH_TO_WEI).toString(),
                {from: loggedInUser.ethereumAddress});
        } else {
            return null;
        }
    }

    async getContractAtAddress(offerType: OfferType, address: string) {
        let contractAbstraction;
        switch (offerType) {
            case OfferType.PLAIN_ADVANCE: {
                contractAbstraction = contract(PlainAdvance);
                break;
            }
            case OfferType.DOUBLE_ADVANCE: {
                contractAbstraction = contract(DoubleAdvance);
                break;
            }
        }

        if (this.web3Service.web3 !== null) {
            contractAbstraction.setProvider(this.web3Service.web3.currentProvider);
            return await contractAbstraction.at(address);
        } else {
            return null;
        }
    }

    private getUserWithConditions(
        loggedInUser: SimpleUser | null,
        buyerAddress: string,
        sellerAddress: string): SimpleUser {
        if (loggedInUser === null) {
            throw new Error("User must be logged in to create contract!");
        }

        if (loggedInUser.ethereumAddress === null) {
            throw new Error("User must have an Ethereum address to create a contract!");
        }

        // TODO: multiple accounts?
        if (this.web3Service.accounts[0] !== loggedInUser.ethereumAddress) {
            throw new Error("Log in to your Ethereum account in order to initiate a transaction!");
        }

        if (loggedInUser.ethereumAddress !== sellerAddress
            && loggedInUser.ethereumAddress !== buyerAddress) {
            throw new Error("Only buyer or seller may initiate the transaction!");
        }

        return loggedInUser;
    }
}
