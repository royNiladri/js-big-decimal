//function add {
export function add(number1: string, number2 = "0") {

  let negativeNumber1: string = '';
  let negativeNumber2: string = '';
  let negativeResult: string = '';

  //check for negatives
  if (number1[0] == '-') {
    number1 = number1.substring(1);
    if (!testZero(number1)) negativeNumber1 = '-';
  }

  if (number2[0] == '-') {
    number2 = number2.substring(1);
    if (!testZero(number2)) negativeNumber2 = '-';
  }

  let exponent: number;
  let values: string[] = [];
  ({ values, exponent } = bigIntPad(number1, number2));
  [number1, number2] = values;

  number1 = negativeNumber1 + number1
  number2 = negativeNumber2 + number2

  let result = (BigInt(number1) + BigInt(number2)).toString();

  if (result[0] == '-') {
    result = result.substring(1);
    negativeResult = '-';
  }

  if (exponent > 0) {
    exponent = result.length - exponent;
    if(exponent < 0) {
      result = result.padStart(result.length + Math.abs(exponent),'0');
      exponent = 0;
    }

    result = result.slice(0, exponent) + '.' + result.slice(exponent);
  }

  if (result[0] == '.') result = '0' + result;
  result = negativeResult + result;

  return result;
}

function bigIntPad(number1: string, number2: string) {
  let parts1 = number1.split("."),
    parts2 = number2.split(".");

  //pad integer part
  let length = Math.max(parts1[0].length, parts2[0].length)
  parts1[0] = parts1[0].padStart(length, "0");
  parts2[0] = parts2[0].padStart(length, "0");

  //pad fractional part
  parts1[1] = parts1[1] || ""
  parts2[1] = parts2[1] || ""
  length = Math.max(parts1[1].length, parts2[1].length)
  parts1[1] = parts1[1].padEnd(length, "0");
  parts2[1] = parts2[1].padEnd(length, "0");

  return { values: [parts1[0] + parts1[1], parts2[0] + parts2[1]], exponent: parts1[1].length };
}

export function trim(number: string) {
  let parts = number.split(".");
  parts[0]

  if (!parts[0]) parts[0] = "0";

  while (parts[0][0] == "0" && parts[0].length > 1)
    parts[0] = parts[0].substring(1);

  return parts[0] + (parts[1] ? "." + parts[1] : "");
}

export function pad(number1: string, number2: string) {
  let parts1 = number1.split("."),
    parts2 = number2.split(".");

  //pad integral part
  let length = Math.max(parts1[0].length, parts2[0].length)
  parts1[0] = parts1[0].padStart(length, "0");
  parts2[0] = parts2[0].padStart(length, "0");

  //pad fractional part
  parts1[1] = parts1[1] || ""
  parts2[1] = parts2[1] || ""
  length = Math.max(parts1[1].length, parts2[1].length)
  parts1[1] = parts1[1].padEnd(length, "0");
  parts2[1] = parts2[1].padEnd(length, "0");

  number1 = parts1[0] + (parts1[1] ? "." + parts1[1] : "");
  number2 = parts2[0] + (parts2[1] ? "." + parts2[1] : "");

  return [number1, number2];
}

function testZero(number: string) {
  return /^0[0]*[.]{0,1}[0]*$/.test(number);
}
