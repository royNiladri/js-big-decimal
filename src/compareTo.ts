import { pad } from './add';
import { stripTrailingZero } from './stripTrailingZero';

export function compareTo(number1: string, number2: string) {
	let negative = '';

	[number1, number2] = [number1, number2].map(n => stripTrailingZero(n));

	// Early escapes

	// If num 1 is negative and num 2 is positive
	if (number1[0] == '-' && number2[0] != "-") return -1;

	// If num 2 is negative and num 1 is positive
	if (number1[0] != '-' && number2[0] == '-') return 1;

	// If num 1 and num 2 are negative
	if (number1[0] == '-' && number2[0] == '-') {
		number1 = number1.substring(1);
		number2 = number2.substring(1);
		negative = '-';
	};

	({ number1, number2 } = pad(number1, number2));

	if (number1.length > number2.length) return parseInt(negative + '1');
	if (number1.length < number2.length) return (negative) ? 1 : -1;

	[number1, number2] = [negative + number1, negative + number2]

	return number1.localeCompare(number2, undefined, { numeric: true })

}

// Wrapper functions

export function lessThan(left: string, right: string, orEquals: boolean = false) {
	return (orEquals) ? (compareTo(left, right) <= 0) : (compareTo(left, right) < 0)
}

export function greaterThan(left: string, right: string, orEquals: boolean = false) {
	return (orEquals) ? (compareTo(left, right) >= 0) : (compareTo(left, right) > 0)
}

export function equals(left: string, right: string) {
	return (compareTo(left, right) == 0)
}

export function isExatclyZero(number: string) {
	return /^0[0]*[.]{0,1}[0]*$/.test(number);
}

export function isExatclyOne(number: string) {
	return /^[0]*[1](?:[.]{1}[0]*)?$/.test(number);
}

export function isEven(number: string) {
	if (number.includes('.')) return /[02468]{1}$/.test(number[number.indexOf('.') - 1])
	return /[02468]{1}$/.test(number[number.length - 1])
}

export function isOdd(number: string) {
	if (number.includes('.')) return /[13579]{1}$/.test(number[number.indexOf('.') - 1]);
	return /[13579]{1}$/.test(number[number.length - 1])
}