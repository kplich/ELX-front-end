/**
 * State of the contract as an integer. (for integration with data read from blockchain)
 */
export enum ContractState {
    CREATED,
    AWAITING_OTHER,
    LOCKED,
    RELEASED,
    COMPLETED,
    REPORTED, // reserved for future use
    RESOLVED // reserved for future use
}

/**
 * State of the contract as a string. (for display in the application)
 */
export enum ContractStateString {
    CREATED = "Created",
    AWAITING_OTHER = "Awaiting the other party",
    LOCKED = "Locked",
    RELEASED = "Released",
    COMPLETED = "Completed",
    REPORTED = "Reported", // reserved for future use
    RESOLVED = "Resolved" // reserved for future use
}

/**
 * Convert the contract state to a corresponding string.
 */
export function contractStateToString(state: ContractState): ContractStateString {
    switch (state) {
        case ContractState.CREATED: return ContractStateString.CREATED;
        case ContractState.AWAITING_OTHER: return ContractStateString.AWAITING_OTHER;
        case ContractState.LOCKED: return ContractStateString.LOCKED;
        case ContractState.RELEASED: return ContractStateString.RELEASED;
        case ContractState.COMPLETED: return ContractStateString.COMPLETED;
        case ContractState.REPORTED: return ContractStateString.REPORTED;
        case ContractState.RESOLVED: return ContractStateString.RESOLVED;
    }
}

/**
 * Convert the contract state to a corresponding integer.
 */
export function stringToContractState(contractString: ContractStateString): ContractState {
    switch (contractString) {
        case ContractStateString.CREATED: return ContractState.CREATED;
        case ContractStateString.AWAITING_OTHER: return ContractState.AWAITING_OTHER;
        case ContractStateString.LOCKED: return ContractState.LOCKED;
        case ContractStateString.RELEASED: return ContractState.RELEASED;
        case ContractStateString.COMPLETED: return ContractState.COMPLETED;
        case ContractStateString.REPORTED: return ContractState.REPORTED;
        case ContractStateString.RESOLVED: return ContractState.RESOLVED;
    }
}
