export enum ContractState {
    CREATED,
    AWAITING_OTHER,
    LOCKED,
    RELEASED,
    COMPLETED,
    REPORTED, // reserved for future use
    RESOLVED // reserved for future use
}

export enum ContractStateString {
    CREATED = "Created",
    AWAITING_OTHER = "Awaiting the other party",
    LOCKED = "Locked",
    RELEASED = "Released",
    COMPLETED = "Completed",
    REPORTED = "Reported",
    RESOLVED = "Resolved"
}

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
