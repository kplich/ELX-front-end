export {};

/**
 * A bit of black magic in order to make TypeScript believe that window.ethereum exists.
 */
declare global {
    interface Window {
        ethereum?: any;
    }
}
