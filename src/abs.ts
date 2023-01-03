export function abs(n: number|string|bigint){
    if (typeof n == 'number' || typeof n == 'bigint')
        n = n.toString();
    if (n[0] == '-')
        return n.substring(1);
    return n;
}