export function add(number1: string, number2 = "0") {

  let exponent: number = 0;
  let negativeNumber1: string = '';
  let negativeNumber2: string = '';
  let negativeResult: string = '';

  //check for negatives
  if (number1[0] == '-') {
    number1 = number1.substring(1);
    if (!testZero(number1))
      negativeNumber1 = '-'
    else return number2;
  }

  if (number2[0] == '-') {
    number2 = number2.substring(1);
    if (!testZero(number2))
      negativeNumber2 = '-'
    else return negativeNumber1 + number1;
  }

  ({ number1, number2, exponent } = pad(number1, number2));

  number1 = negativeNumber1 + number1
  number2 = negativeNumber2 + number2

  let result = (BigInt(number1) + BigInt(number2)).toString();

  if (result[0] == '-') {
    result = result.substring(1);
    negativeResult = '-';
  }

  if (exponent > 0) {
    exponent = result.length - exponent;
    if (exponent < 0) {
      result = result.padStart(result.length + Math.abs(exponent), '0');
      exponent = 0;
    }

    result = result.slice(0, exponent) + '.' + result.slice(exponent);
  }

  if (result[0] == '.') result = '0' + result;
  result = negativeResult + result;

  return result;
}

export function pad(number1: string, number2: string) {

  const length1 = number1.length;
  const length2 = number2.length;

  let decimalIndex1 = (number1.includes('.')) ? number1.indexOf('.') : length1;
  let decimalLength1 = length1 - decimalIndex1;

  let decimalIndex2 = (number2.includes('.')) ? number2.indexOf('.') : length2;
  let decimalLength2 = length2 - decimalIndex2;

  let pad1 = number1.substring(0, decimalIndex1) + number1.substring(decimalIndex1 + 1);
  let pad2 = number2.substring(0, decimalIndex2) + number2.substring(decimalIndex2 + 1);

  const decimalDifference = decimalLength1 - decimalLength2;
  const decimalLength = Math.max(decimalLength1, decimalLength2) - 1;
  const decimalIndex = Math.min(decimalIndex1, decimalIndex2);

  if (decimalDifference < 0) {
    pad1 = pad1.padEnd(decimalIndex1 + decimalLength, '0');
    pad2 = pad2.padEnd(decimalIndex + decimalLength, '0');
  }

  if (decimalDifference > 0) {
    pad1 = pad1.padEnd(decimalIndex + decimalLength - 1, '0');
    pad2 = pad2.padEnd(decimalIndex2 + decimalLength, '0');
  }

  return {
    number1: pad1,
    number2: pad2,
    exponent: Math.max(decimalLength, 0)
  };
}

export function trim(number: string) {
  let parts = number.split(".");

  if (!parts[0]) parts[0] = "0";

  while (parts[0][0] == "0" && parts[0].length > 1)
    parts[0] = parts[0].substring(1);

  return parts[0] + (parts[1] ? "." + parts[1] : "");
}

function testZero(number: string) {
  return /^0[0]*[.]{0,1}[0]*$/.test(number);
}
