import { roundOff } from './round';

export function divide(dividend: string | number, divisor: string | number, precission: number = 8) {
    // Convert to string
    if (typeof dividend == 'number' || typeof divisor == 'number') {
        dividend = dividend.toString();
        divisor = divisor.toString();
    }

    // Return 0 
    if (divisor == '0') {
        return '0' + (!precission) ? '' : '.' + new Array(precission).join('0');
    }

    // precission = precission + 2;
    let negativeDividend: string = '';
    let negativeDivisor: string = '';
    let negativeResult: string = '';
    let dividendIndex = dividend.length;
    let divisorIndex = divisor.length;
    let resultIndex = 0;

    const findNegativeOffset = /^(?:[0]+)(?:[.])([0]+)(?:\d+)/;
    const trimStart = /^(?:[0]+)([^0.]*)/;
    const trimEnd = /((?:[.][0])?[0]*)$/;

    //check for negatives
    if (dividend[0] == '-') {
        dividend = dividend.substring(1);
        negativeDividend = '-'
    }

    if (divisor[0] == '-') {
        divisor = divisor.substring(1);
        negativeDivisor = '-'
    }

    if (negativeDividend !== negativeDivisor) negativeResult = '-';

    if (dividend.includes('.')) {
        dividend = dividend.replace(trimEnd, "");
        if (dividend.includes('.')) {
            if (findNegativeOffset.test(dividend))
                dividendIndex = -(dividend.replace(findNegativeOffset, '$1').length)
            else if (dividend[0] == '0')
                dividendIndex = dividend.indexOf('.') - 1
            else dividendIndex = dividend.indexOf('.');
            dividend = dividend.substring(0, dividend.indexOf('.')) + dividend.substring(dividend.indexOf('.') + 1);
        } else dividendIndex = dividend.length;
    }

    if (divisor.includes('.')) {
        divisor = divisor.replace(trimEnd, "");
        if (divisor.includes('.')) {
            if (findNegativeOffset.test(divisor))
                divisorIndex = -(divisor.replace(findNegativeOffset, '$1').length)
            else  if (divisor[0] == '0')
                divisorIndex = divisor.indexOf('.') - 1
            else divisorIndex = divisor.indexOf('.');
            divisor = divisor.substring(0, divisor.indexOf('.')) + divisor.substring(divisor.indexOf('.') + 1);
        } else divisorIndex = divisor.length;
    }

    resultIndex = dividendIndex - divisorIndex;

    const dividendInt = BigInt(dividend);
    const divisorInt = BigInt(divisor);
    const precisionInt = BigInt('1'.padEnd(Math.max(dividend.length, divisor.length) + precission + 2, '0'));

    dividend = dividend.replace(trimStart, "$1");
    divisor = divisor.replace(trimStart, "$1");

    const intDifference = dividend.length - divisor.length;
    const paddingInt = BigInt('1'.padEnd(Math.abs(intDifference) + 1, '0'));

    let result = ((dividendInt * precisionInt) / divisorInt).toString();

    if (resultIndex > 0) {
        if (intDifference > 0) {
            if (Math.sign(dividendIndex) == Math.sign(divisorIndex) && dividendInt > (divisorInt * paddingInt))
                resultIndex++
            else if (Math.sign(dividendIndex) >= 0 && dividendInt > (divisorInt * paddingInt)) resultIndex++;
        } else {
            resultIndex++;
        }
        return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission)
    }

    if (resultIndex < 0) {
        if (intDifference > 0) {
            if (Math.sign(dividendIndex) == Math.sign(divisorIndex) && (dividendInt * paddingInt) > divisorInt) resultIndex++;
        } else {
            if ((dividendInt * paddingInt) > divisorInt) resultIndex++;
        }
        return roundOff(negativeResult + '0.'.padEnd(Math.abs(resultIndex) + 2, '0') + result, precission);
    }

    if (resultIndex == 0) {
        if (intDifference > 0 && dividendInt > (divisorInt * paddingInt)) {
            resultIndex++
            return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
        }
        if (intDifference < 0 && (dividendInt * paddingInt) > divisorInt) {
            resultIndex++
            return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
        }
        if (dividendInt > (divisorInt) || dividendInt == divisorInt) {
            resultIndex++
            return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
        }
        return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission)
    }
}