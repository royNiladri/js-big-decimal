export function multiply(number1, number2) {
	number1 = number1.toString();
	number2 = number2.toString();

	/*Filter numbers*/
	let negative = 0;
	if (number1[0] == '-') {
		negative++;
		number1 = number1.substr(1);
	}
	if (number2[0] == '-') {
		negative++;
		number2 = number2.substr(1);
	}
	number1 = trailZero(number1);
	number2 = trailZero(number2);
	let decimalLength1 = 0;
	let decimalLength2 = 0;

	if (number1.indexOf('.') != -1) {
		decimalLength1 = number1.length - number1.indexOf('.') - 1;
	}

	if (number2.indexOf('.') != -1) {
		decimalLength2 = number2.length - number2.indexOf('.') - 1;
	}
	let decimalLength = decimalLength1 + decimalLength2;
	number1 = trailZero(number1.replace('.', ''));
	number2 = trailZero(number2.replace('.', ''));

	if (number1.length < number2.length) {
		let temp = number1;
		number1 = number2;
		number2 = temp;
	}

	if (number2 == '0') {
		return '0';
	}

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
	result = trailZero(adjustDecimal(result, decimalLength));
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

/*
* Removes zero from front and back*/
function trailZero(number) {
	while (number[0] == '0') {
		number = number.substr(1);
	}
	if (number.indexOf('.') != -1) {
		while (number[number.length - 1] == '0') {
			number = number.substr(0, number.length - 1);
		}
	}
	if (number == "" || number == ".") {
		number = '0';
	} else if (number[number.length - 1] == '.') {
		number = number.substr(0, number.length - 1);
	}
	if (number[0] == '.') {
		number = '0' + number;
	}
	return number;
}