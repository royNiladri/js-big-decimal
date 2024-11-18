import { isExatclyZero } from "./compareTo";
import { stripTrailingZero } from "./stripTrailingZero"

export function multiply(number1: string, number2: string) {
	let negativeNumber1 = '';
	let negativeNumber2 = '';
	let negativeResult = '';

	if (number1[0] == '-') {
		number1 = number1.substring(1);
		negativeNumber1 = '-';
	}
	if (number2[0] == '-') {
		number2 = number2.substring(1);
		negativeNumber2 = '-';
	}

	if(isExatclyZero(number1) || isExatclyZero(number2)) return '0';

	number1 = stripTrailingZero(number1);
	number2 = stripTrailingZero(number2);

	let decimalLength1 = 0;
	let decimalLength2 = 0;

	if (number1.indexOf('.') + 1) {
		decimalLength1 = number1.length - number1.indexOf('.') - 1;
	}

	if (number2.indexOf('.') + 1) {
		decimalLength2 = number2.length - number2.indexOf('.') - 1;
	}

	let decimalLength = decimalLength1 + decimalLength2;
	number1 = negativeNumber1 + stripTrailingZero(number1.replace('.', ''));
	number2 = negativeNumber2 + stripTrailingZero(number2.replace('.', ''));

	let result = (BigInt(number1) * BigInt(number2)).toString();

	if (result[0] == '-') {
		result = result.substring(1);
		negativeResult = '-';
	}

	if (decimalLength > 0) {
		decimalLength = result.length - decimalLength;
		if (decimalLength < 0) {
			result = result.padStart(result.length + Math.abs(decimalLength), '0');
			decimalLength = 0;
		}

		result = (result.slice(0, decimalLength) || '0') + '.' + result.slice(decimalLength);
	}

	return stripTrailingZero(negativeResult + result);
}
