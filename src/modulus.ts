import { divide } from './divide';
import { roundOff } from './round';
import { multiply } from './multiply';
import { subtract } from './subtract';
import { RoundingModes } from './roundingModes';

export function modulus(dividend: number|string, divisor:number|string) {
    if (divisor == 0) {
        throw new Error('Cannot divide by 0');
    }

    dividend = dividend.toString();
    divisor = divisor.toString();

    validate(dividend);
    validate(divisor);

    let sign = '';
    if(dividend[0] == '-'){
        sign = '-';
        dividend = dividend.substr(1);
    }
    if(divisor[0] == '-'){
        divisor = divisor.substr(1);
    }

    let result = subtract(dividend, multiply(divisor, roundOff(divide(dividend, divisor), 0, RoundingModes.FLOOR)));
    return sign+result;
}

function validate(oparand: string) {
    if (oparand.indexOf('.') != -1) {
        throw new Error('Modulus of non-integers not supported');
    }
}
