import { abs } from './abs';
import { roundOff } from './round';

export function divide(dividend: string, divisor: string, precission: number = 8) {

    // Return 0 
    if (divisor == '0') {
        return '0' + (!precission) ? '' : '.' + new Array(precission).join('0');
    }

    if (abs(divisor) == '1') {
        return dividend;
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
    const trimEnd = (n: string) => {
        while (n[n.length - 1] == '0') {
            if(n[n.length - 1] == '.'){
                n = n.substring(0, n.length - 1);
                break;
            }
			n = n.substring(0, n.length - 1);
		}
        return n;
    }

    //check for negatives
    if (dividend[0] == '-') {
        dividend = dividend.substring(1);
        negativeDividend = '-'
        dividendIndex--;
    }

    if (divisor[0] == '-') {
        divisor = divisor.substring(1);
        negativeDivisor = '-';
        divisorIndex--;
    }

    if (negativeDividend !== negativeDivisor) negativeResult = '-';

    if (dividend.includes('.')) {
        dividend = trimEnd(dividend)
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
        divisor = trimEnd(divisor)
        if (divisor.includes('.')) {
            if (findNegativeOffset.test(divisor))
                divisorIndex = -(divisor.replace(findNegativeOffset, '$1').length)
            else if (divisor[0] == '0')
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
    // console.log('resultIndex', resultIndex)
    // console.log('intDifference', intDifference)

    if (resultIndex == 0) {
        let intBasis = intDifference > 0;

        if (intBasis && dividendInt >= (divisorInt * paddingInt)) {
            resultIndex++
        } else if (!intBasis && (dividendInt * paddingInt) >= divisorInt) {
            resultIndex++
        } else if (dividendInt == divisorInt) {
            resultIndex++
        }
        return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission)
    }

    if (intDifference > 0) {
        if (Math.sign(dividendIndex) == Math.sign(divisorIndex) && dividendInt >= (divisorInt * paddingInt))
            resultIndex++
        else if (Math.sign(dividendIndex) >= 0 && dividendInt >= (divisorInt * paddingInt))
            resultIndex++
        else if (resultIndex < 0 && dividendInt >= (divisorInt * paddingInt)) resultIndex++;
    } else {
        if ((dividendInt * paddingInt) >= divisorInt) resultIndex++;
    }

    if (resultIndex > 0) {
        return roundOff(negativeResult + (result.substring(0, resultIndex) || '0') + '.' + result.substring(resultIndex), precission);
    }

    return trimEnd(roundOff(negativeResult + '0.'.padEnd(Math.abs(resultIndex) + 2, '0') + result, precission));

}