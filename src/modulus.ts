import { divide } from './divide';
import { roundOff } from './round';
import { multiply } from './multiply';
import { negate, subtract } from './subtract';
import { RoundingModes } from './roundingModes';
import { abs } from './abs';

export function modulusE(n: number | string, base: number | string = 1, percision: number | undefined = undefined) {
    
    if (base == 0) {
        throw new Error('Cannot divide by 0');
    }

    n = n.toString();
    base = base.toString();
  
    validate(base);

    return subtract(n, multiply(base, roundOff(divide(n, base, percision), 0, RoundingModes.FLOOR)));
}

export function modulus(dividend: number | string, divisor: number | string = 1, percision: number | undefined = undefined) {
    if (divisor == 0) {
        throw new Error('Cannot divide by 0');
    }

    dividend = dividend.toString();
    divisor = divisor.toString();

    validate(divisor);

    const result = modulusE(abs(dividend), abs(divisor), percision);
    return (dividend.includes('-')) ? negate(result) : result;
}

function validate(oparand: string) {
    if (oparand.includes('.')) {
        throw new Error('Modulus of non-integers not supported');
    }
}


