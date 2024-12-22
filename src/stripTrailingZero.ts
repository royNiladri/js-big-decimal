/*
* Removes zero from front and back*/
export function stripTrailingZero(number: string) {
	
	// number = number.replace(/(^[-]?)([0]*)/, `${1}`);
	// number = number.replace(/([0]*$){1}/, '');
	// return number;
	const trimStart = /^(?:[0]+)([^0.]*)/;
    const trimEnd = /((?:[.][0])?[0]*)$/;
	const isNegative = number[0] === '-';
	if (isNegative) {
		number = number.substring(1);
	}
	number = number.replace(trimStart, "$1");
	// while (number[0] == '0') {
	// 	number = number.replace(trimStart, "$1");
	// }
	if (number.indexOf('.') != -1) {
		while (number[number.length - 1] == '0') {
			number = number.substring(0, number.length - 1);
		}
		// number = number.replace(trimEnd, "")
	}
	if (number == "" || number == ".") {
		number = '0';
	} else if (number[number.length - 1] == '.') {
		number = number.substring(0, number.length - 1);
	}
	if (number[0] == '.') {
		number = '0' + number;
	}
	if (isNegative && number != '0') {
		number = '-' + number;
	}
	return number;
}