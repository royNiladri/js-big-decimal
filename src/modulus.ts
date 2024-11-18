import { divide } from './divide';
import { roundOff } from './round';
import { multiply } from './multiply';
import { negate, subtract } from './subtract';
import { RoundingModes } from './roundingModes';
import { abs } from './abs';
import { validateDivideByZero } from './validators';
import { stripTrailingZero } from './stripTrailingZero';

export function modulusE(n: string, base: string = '1', precision: number = 64) {
    validateDivideByZero(base, 'modulus');
    return stripTrailingZero(roundOff(subtract(n, multiply(base, roundOff(divide(n, base, precision + 1), 0, RoundingModes.FLOOR))), precision));
}

export function modulus(n: string, base: string = '1', precision: number = 64) {
    validateDivideByZero(base, 'modulus');
    const result = modulusE(abs(n), abs(base), precision);
    return stripTrailingZero((n.includes('-')) ? negate(result) : result);
}


