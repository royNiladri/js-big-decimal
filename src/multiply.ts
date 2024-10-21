import { stripTrailingZero } from "./stripTrailingZero"

export function multiply(number1, number2) {
	number1 = number1.toString();
	number2 = number2.toString();

	let negativeNumber1: string = '';
	let negativeNumber2: string = '';
	let negativeResult: string = '';


	/*Filter numbers*/
	let negative = 0;
	if (number1[0] == '-') {
		negative++;
		number1 = number1.substr(1);
		negativeNumber1 = '-';
	}
	if (number2[0] == '-') {
		negative++;
		number2 = number2.substr(1);
		negativeNumber2 = '-';
	}

	number1 = stripTrailingZero(number1);
	number2 = stripTrailingZero(number2);
	let decimalLength1 = 0;
	let decimalLength2 = 0;

	if (number1.indexOf('.') != -1) {
		decimalLength1 = number1.length - number1.indexOf('.') - 1;
	}

	if (number2.indexOf('.') != -1) {
		decimalLength2 = number2.length - number2.indexOf('.') - 1;
	}

	let decimalLength = decimalLength1 + decimalLength2;
	number1 = stripTrailingZero(number1.replace('.', ''));
	number2 = stripTrailingZero(number2.replace('.', ''));
	
	number1 = negativeNumber1 + number1
	number2 = negativeNumber2 + number2

	if (number1.length < number2.length) {
		let temp = number1;
		number1 = number2;
		number2 = temp;
	}

	if (number2 == '0') {
		return '0';
	}


	const n1 = BigInt(number1)
	const n2 = BigInt(number2)
	let res = (n1 * n2).toString();

	if (res[0] == '-') {
		res = res.substring(1);
		negativeResult = '-';
	}

	if (decimalLength > 0) {
		decimalLength = res.length - decimalLength;
		if (decimalLength < 0) {
			res = res.padStart(res.length + Math.abs(decimalLength), '0');
			decimalLength = 0;
		}

		res = res.slice(0, decimalLength) + '.' + res.slice(decimalLength);
	}

	if (res[0] == '.') res = '0' + res;
	res = negativeResult + res;
	return res;

	/*
	* Core multiplication
	*/
	let length = number2.length;
	let carry = 0;
	let positionVector = [];
	let currentPosition = length - 1;

	let result = "";
	for (let i = 0; i < length; i++) {
		positionVector[i] = number1.length - 1;
	}
	for (let i = 0; i < 2 * number1.length; i++) {
		let sum = 0;
		for (let j = number2.length - 1; j >= currentPosition && j >= 0; j--) {
			if (positionVector[j] > -1 && positionVector[j] < number1.length) {
				sum += parseInt(number1[positionVector[j]--]) * parseInt(number2[j]);
			}
		}
		sum += carry;
		carry = Math.floor(sum / 10);
		result = sum % 10 + result;
		currentPosition--;
	}
	/*
	* Formatting result
	*/
	result = stripTrailingZero(adjustDecimal(result, decimalLength));
	if (negative == 1) {
		result = '-' + result;
	}
	return result;
}

/*
* Add decimal point
*/
function adjustDecimal(number, decimal) {
	if (decimal == 0)
		return number;
	else {
		number = (decimal >= number.length) ? ((new Array(decimal - number.length + 1)).join('0') + number) : number;
		return number.substr(0, number.length - decimal) + '.' + number.substr(number.length - decimal, decimal)
	}
}
