import { add, trim } from "./add";
import { abs } from "./abs";
import { roundOff } from "./round";
import { multiply } from "./multiply";
import { divide } from "./divide";
import { modulus, modulusE } from "./modulus";
import { compareTo, equals, greaterThan, lessThan } from "./compareTo";
import { subtract, negate } from "./subtract";
import { RoundingModes as Modes, RoundingModes } from "./roundingModes";
import { stripTrailingZero } from "./stripTrailingZero";
import { cbRoot, pow, sqRoot } from "./pow";
import { factorial, sign } from "./utils";
import { acos, asin, atan, atan2, cos, cosh, hypot, sin, sinh, tan, tanh } from "./trig";
import { ln, log, ln2, log10, exp, LN2, LN10, LOG2E, LOG10E, Euler, expm1 } from "./logarithm";

class bigDecimal {
  private value: string;
  static RoundingModes = Modes;
  private static validate(number: number | string | bigint ): string {
    if (number) {
      number = number.toString();
      if (isNaN(Number(number))) throw Error("Parameter is not a number: " + number);
      if (number[0] == "+") number = number.substring(1);
    } else number = "0";

    //handle missing leading zero
    if (number.startsWith(".")) number = "0" + number;
    else if (number.startsWith("-.")) number = "-0" + number.substring(1);

    //handle exponentiation (scientific notation)
    if (/e/i.test(number)) {
      let [mantisa, exponent] = number.split(/[eE]/);
      let exponentIndex = Number(exponent)
      mantisa = trim(mantisa);
      let sign = "";
      if (mantisa[0] == "-") {
        sign = "-";
        mantisa = mantisa.substring(1);
      }

      if (mantisa.indexOf(".") >= 0) {
        exponentIndex = parseInt(exponent) + mantisa.indexOf(".");
        mantisa = mantisa.replace(".", "");
      } else {
        exponentIndex = parseInt(exponent) + mantisa.length;
      }

      if (mantisa.length < exponentIndex) {
        number =
          sign + mantisa + new Array(exponentIndex - mantisa.length + 1).join("0");
      } else if (mantisa.length >= exponentIndex && exponentIndex > 0) {
        number =
          sign +
          trim(mantisa.substring(0, exponentIndex)) +
          (mantisa.length > exponentIndex ? "." + mantisa.substring(exponentIndex) : "");
      } else {
        number = sign + "0." + new Array(-exponentIndex + 1).join("0") + mantisa;
      }
    }

    return number;
  }

  constructor(number: number | string | bigint = "0") {
    this.value = bigDecimal.validate(number);
  }

  getValue() {
    return this.value;
  }

  setValue(num: number | string | bigint) {
    this.value = bigDecimal.validate(num);
  }

  static getPrettyValue(number, digits = 3, separator = ","): string {
    // if (!(digits || separator)) {
    //     digits = 3;
    //     separator = ',';
    // } else if (!(digits && separator)) {
    //     throw Error('Illegal Arguments. Should pass both digits and separator or pass none');
    // }
    number = bigDecimal.validate(number);
    let neg = number.charAt(0) == "-";
    if (neg) number = number.substring(1);
    var len = number.indexOf(".");
    len = len > 0 ? len : number.length;
    var temp = "";
    for (var i = len; i > 0; ) {
      if (i < digits) {
        digits = i;
        i = 0;
      } else i -= digits;

      temp =
        number.substring(i, i + digits) +
        (i < len - digits && i >= 0 ? separator : "") +
        temp;
    }
    return (neg ? "-" : "") + temp + number.substring(len);
  }
  getPrettyValue(digits = 3, separator = ",") {
    return bigDecimal.getPrettyValue(this.value, digits, separator);
  }

  static round(number, precision = 0, mode = Modes.HALF_EVEN) {
    number = bigDecimal.validate(number);
    // console.log(number)
    if (isNaN(precision))
      throw Error("Precision is not a number: " + precision);
    return roundOff(number, precision, mode);
  }

  round(precision = 0, mode = Modes.HALF_EVEN) {
    if (isNaN(precision))
      throw Error("Precision is not a number: " + precision);

    return new bigDecimal(roundOff(this.value, precision, mode));
  }

  static abs(number) {
    number = bigDecimal.validate(number);
    return abs(number);
  }

  abs() {
    return new bigDecimal(abs(this.value));
  }

  static floor(number) {
    number = bigDecimal.validate(number);
    if (number.indexOf(".") === -1) return number;
    return bigDecimal.round(number, 0, RoundingModes.FLOOR);
  }

  floor() {
    if (this.value.indexOf(".") === -1) return new bigDecimal(this.value);
    return new bigDecimal(this.value).round(0, RoundingModes.FLOOR);
  }

  static ceil(number) {
    number = bigDecimal.validate(number);
    if (number.indexOf(".") === -1) return number;
    return bigDecimal.round(number, 0, RoundingModes.CEILING);
  }

  ceil() {
    if (this.value.indexOf(".") === -1) return new bigDecimal(this.value);
    return new bigDecimal(this.value).round(0, RoundingModes.CEILING);
  }

  static add(number1, number2) {
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return add(number1, number2);
  }

  add(number: bigDecimal) {
    return new bigDecimal(add(this.value, number.getValue()));
  }

  static subtract(number1, number2) {
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return subtract(number1, number2);
  }

  subtract(number: bigDecimal) {
    return new bigDecimal(subtract(this.value, number.getValue()));
  }

  static multiply(number1, number2) {
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return multiply(number1, number2);
  }

  multiply(number: bigDecimal) {
    return new bigDecimal(multiply(this.value, number.getValue()));
  }

  static divide(number1, number2, precision?: number) {
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return divide(number1, number2, precision);
  }

  divide(number: bigDecimal, precision?: number) {
    return new bigDecimal(divide(this.value, number.getValue(), precision));
  }

  static modulus(number1, number2) {
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return modulus(number1, number2);
  }

  modulus(number: bigDecimal) {
    return new bigDecimal(modulus(this.value, number.getValue()));
  }

  static modulusE(number1, number2) {
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return modulusE(number1, number2);
  }

  modulusE(number: bigDecimal) {
    return new bigDecimal(modulusE(this.value, number.getValue()));
  }

  static negate(number) {
    number = bigDecimal.validate(number);
    return negate(number);
  }

  negate() {
    return new bigDecimal(negate(this.value));
  }

  // Powers

  static pow(base: number|string, exponent: number|string) {
    base = bigDecimal.validate(base);
    exponent = bigDecimal.validate(exponent);
    return pow(base, exponent);
  }

  pow(exponent: bigDecimal) {
    return new bigDecimal(pow(this.value, exponent.getValue(), 32));
  }

  // Roots

  static get SQRT1_2() {
    return sqRoot('.5');
  }

  static get SQRT2() {
    return sqRoot('2');
  }

  static sqRoot(number: number|string): string {
    number = bigDecimal.validate(number);
    return sqRoot(number);
  }

  sqRoot(): bigDecimal {
    return new bigDecimal(sqRoot(this.value));
  }

  static cbRoot(number: number|string): string {
    number = bigDecimal.validate(number);
    return cbRoot(number);
  }

  cbRoot(): bigDecimal {
    return new bigDecimal(cbRoot(this.value));
  }

  // Logarithms

  static get E() {
    return Euler(32);
  }

  static get LN2(){
    return LN2
  }

  static get LN10(){
    return LN10
  }

  static get LOG2E(){
    return LOG2E
  }

  static get LOG10E(){
    return LOG10E
  }

  static log2(number: number|string){
    number = bigDecimal.validate(number);
    return ln2(number)
  }  

  static log10(number: number|string){
    number = bigDecimal.validate(number);
    return log10(number)
  }

  static log1p(number: number|string){
    number = bigDecimal.validate(number);
    return log(add('1', number))
  }

  static log(number: number|string){
    number = bigDecimal.validate(number);
    return log(number)
  }

  static exp(number: number|string): string {
    number = bigDecimal.validate(number);
    return exp(number);
  }

  static expm1(number: number|string): string {
    number = bigDecimal.validate(number);
    return expm1(number)
  }

  // Trig
  static hypot(a: number|string, b: number|string){
    a = bigDecimal.validate(a);
    b = bigDecimal.validate(b);

    return hypot(a,b);

  }

  static sin(number: number|string): string {
    number = bigDecimal.validate(number);
    return sin(number);
  }

  static sinh(number: number|string): string {
    number = bigDecimal.validate(number);
    return sinh(number);
  }

  static asin(number: number|string): string {
    number = bigDecimal.validate(number);
    return asin(number);
  }

  static cos(number: number|string): string {
    number = bigDecimal.validate(number);
    return cos(number);
  }

  static cosh(number: number|string): string {
    number = bigDecimal.validate(number);
    return cosh(number);
  }

  static acos(number: number|string): string {
    number = bigDecimal.validate(number);
    return acos(number);
  }

  static tan(number: number|string): string {
    number = bigDecimal.validate(number);
    return tan(number);
  }

  static tanh(number: number|string): string {
    number = bigDecimal.validate(number);
    return tanh(number);
  }

  static atan(number: number|string): string {
    number = bigDecimal.validate(number);
    return atan(number);
  }

  static atan2(y: number|string, x: number|string): string {
    x = bigDecimal.validate(x);
    y = bigDecimal.validate(y);
    return atan2(y, x);
  }

  // Comparisons
  static compareTo(number1: number|string, number2: number|string) {
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return compareTo(number1, number2);
  }

  compareTo(number: bigDecimal) {
    return compareTo(this.value, number.getValue());
  }

  static equals(number1: number|string, number2: number|string){
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return equals(number1, number2);
  }

  equals(number: bigDecimal){
    return equals(this.value, number.getValue());
  }

  static lt(number1: number|string, number2: number|string){
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return lessThan(number1, number2);
  }

  lt(number: bigDecimal){
    return lessThan(this.value, number.getValue());
  }

  static leq(number1: number|string, number2: number|string){
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return lessThan(number1, number2, true);
  }

  leq(number: bigDecimal){
    return lessThan(this.value, number.getValue(), true);
  }

  static gt(number1: number|string, number2: number|string){
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return greaterThan(number1, number2);
  }

  gt(number: bigDecimal){
    return greaterThan(this.value, number.getValue());
  }

  static geq(number1: number|string, number2: number|string){
    number1 = bigDecimal.validate(number1);
    number2 = bigDecimal.validate(number2);
    return greaterThan(number1, number2, true);
  }

  geq(number: bigDecimal){
    return greaterThan(this.value, number.getValue(), true);
  }

  static sign(number: number|string){
    number = bigDecimal.validate(number);
    return sign(number);
  }

  sign(){
    return sign(this.value);
  }

  // Misc.

  static factorial(number: number|string): string {
    number = bigDecimal.validate(number);
    return factorial(number);
  }

  static stripTrailingZero(number) {
    number = bigDecimal.validate(number);
    return stripTrailingZero(number);
  }

  stripTrailingZero() {
    return new bigDecimal(stripTrailingZero(this.value));
  }


}
export default bigDecimal;
