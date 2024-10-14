//function add {
export function add(number1: string, number2 = "0") {
  let neg = 0,
    ind = -1,
    neg_len;

  //check for negatives
  if (number1[0] == "-") {
    number1 = number1.substring(1);
    if (!testZero(number1)) {
      neg++;
      ind = 1;
      neg_len = number1.length;
    }
  }
  if (number2[0] == "-") {
    number2 = number2.substring(1);
    if (!testZero(number2)) {
      neg++;
      ind = 2;
      neg_len = number2.length;
    }
  }

  number1 = trim(number1);
  number2 = trim(number2);

  [number1, number2] = pad(trim(number1), trim(number2));

  if (neg == 1) {
    if (ind === 1) number1 = compliment(number1);
    else if (ind === 2) number2 = compliment(number2);
  }

  let res = addCore(number1, number2);
  if (!neg) return trim(res);
  else if (neg == 2) return "-" + trim(res);
  else {
    if (number1.length < res.length) return trim(res.substring(1));
    else return "-" + trim(compliment(res));
  }
}

function compliment(number: string) {
  if (testZero(number)) {
    return number;
  }

  let s = "",
    l = number.length,
    dec = number.split(".")[1],
    ld = dec ? dec.length : 0;

  for (let i = 0; i < l; i++) {
    if (number[i] >= "0" && number[i] <= "9") s += 9 - parseInt(number[i]);
    else s += number[i];
  }

  let one = ld > 0 ? "0." + new Array(ld).join("0") + "1" : "1";

  return addCore(s, one);
}

export function trim(number: string) {
  let parts = number.split(".");

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

function addCore(number1: string, number2: string) {
  [number1, number2] = pad(number1, number2);

  let sum = "",
    carry = 0;

  for (let i = number1.length - 1; i >= 0; i--) {
    if (number1[i] === ".") {
      sum = "." + sum;
      continue;
    }
    let temp = parseInt(number1[i]) + parseInt(number2[i]) + carry;
    sum = (temp % 10) + sum;
    carry = Math.floor(temp / 10);
  }

  return carry ? carry.toString() + sum : sum;
}

function testZero(number: string) {
  return /^0[0]*[.]{0,1}[0]*$/.test(number);
}
