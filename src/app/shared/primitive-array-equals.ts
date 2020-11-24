/**
 * Checks if arrays OF PRIMITIVES are equal.
 * @param a first array of primitives
 * @param b second array of primitives
 * @returns true if arrays are equal, false otherwise
 */
export function primitiveArrayEquals(a: any[], b: any[]): boolean {
    return a.sort().toString() === b.sort().toString();
}
