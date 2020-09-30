export function primitiveArrayEquals(a: any[], b: any[]): boolean {
    return a.sort().toString() === b.sort().toString();
}
