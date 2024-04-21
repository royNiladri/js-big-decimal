import { add } from "./add";
import { divide } from "./divide";
import { exp } from "./logarithm";
import { multiply } from "./multiply";
import { pow } from "./pow";
import { roundOff } from "./round";
import { stripTrailingZero } from "./stripTrailingZero";
import { negate, subtract } from "./subtract";
import { alternatingSeries, factorial, isAproxOne, isAproxZero, sign } from "./utils";

// PI up to the first 64 decimal places
export const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229'

export function sin(x: number | string){
    x = x.toString();
    let s = roundOff(alternatingSeries(1, 32, (n: number)=>{
        const N = (n * 2) - 1;
        return divide(pow(x, N, 32), factorial(N), 33);
    }), 32);
    return isAproxZero(s)? '0': isAproxOne(s)? multiply('1', sign(s)): s;
}

export function sinh(x: number | string){
    x = x.toString();
    return stripTrailingZero(multiply('0.5', subtract(exp(x), exp(negate(x)))));
}

export function cos(x: number | string){
    x = x.toString();
    let s = subtract('1',roundOff(alternatingSeries(1, 32, (n: number)=>{
        const N = (n * 2);
        return divide(pow(x, N), factorial(N), 33);
    }), 32));
    return isAproxOne(s)? multiply('1', sign(s)): isAproxZero(s)? '0': s;
}

export function cosh(x: number | string){
    x = x.toString();
    return stripTrailingZero(multiply('0.5', add(exp(x), exp(negate(x)))));
}

export function tan(x: number | string){
    x = x.toString();
    return stripTrailingZero(divide(sin(x), cos(x), 32));
}

export function tanh(x: number | string){
    x = x.toString();
    return stripTrailingZero(divide(sinh(x), cosh(x), 32));
}