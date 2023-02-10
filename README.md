# JS Big Decimal

<p align="center">
  <img width="163" alt="image" src="https://user-images.githubusercontent.com/16587916/209551931-765fa805-f1c3-4837-8426-09cf6072e126.png">
  <br>
  <i>Work with large numbers on the client side with high precision
    <br> Welcome to a saner world where <code>0.1 + 0.2 = 0.3</code> and not <code>0.30000000000000004</code>
  <br>
</p>

<p align="center">
<a href="https://travis-ci.org/royNiladri/js-big-decimal"><img src="https://img.shields.io/travis/royNiladri/js-big-decimal.svg?style=flat-square" alt="Travis"></a>
<a href="https://coveralls.io/github/royNiladri/js-big-decimal?branch=master"><img src="https://img.shields.io/coveralls/github/royNiladri/js-big-decimal/master?style=flat-square" alt="Coverage Status"></a>
<a href="https://github.com/royNiladri/js-big-decimal/blob/master/LICENSE"><img src="https://img.shields.io/github/license/royNiladri/js-big-decimal.svg?style=flat-square" alt="license"></a>
<a href="https://www.npmjs.com/package/js-big-decimal"><img src="https://img.shields.io/npm/v/js-big-decimal.svg?style=flat-square" alt="npm"></a>
<a href="https://npm-stat.com/charts.html?package=js-big-decimal&amp;from=2017-01-01"><img src="https://img.shields.io/npm/dw/js-big-decimal.svg?style=flat-square" alt="npm"></a>
<a href="https://github.com/royNiladri/js-big-decimal/blob/master/dist/web/js-big-decimal.min.js"><img src="https://img.shields.io/github/size/royNiladri/js-big-decimal/dist/web/js-big-decimal.min.js.svg?style=flat-square" alt="Github file size"></a>
</p>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

  - [Contributors Welcome!](#contributors-welcome)
  - [Installation](#installation)
    - [Usage](#usage)
  - [Operations](#operations)
    - [bigDecimal(number)](#bigdecimalnumber)
    - [getValue()](#getvalue)
    - [setValue()](#setvalue)
    - [getPrettyValue(number, digits, separator)](#getprettyvaluenumber-digits-separator)
    - [round(number, precision, roundingMode)](#roundnumber-precision-roundingmode)
    - [abs(number)](#absnumber)
    - [floor(number)](#floornumber)
    - [ceil(number)](#ceilnumber)
    - [compareTo(number1, number2)](#comparetonumber1-number2)
    - [negate(number)](#negatenumber)
    - [add(augend, addend)](#addaugend-addend)
    - [subtract(minuend, subtrahend)](#subtractminuend-subtrahend)
    - [multiply(multiplicand, multiplier)](#multiplymultiplicand-multiplier)
    - [divide(dividend, divisor, precision)](#dividedividend-divisor-precision)
    - [modulus(dividend, divisor)](#modulusdividend-divisor)
- [Support the developers :heart: :star: :money_with_wings:](#support-the-developers-heart-star-money_with_wings)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Contributors Welcome!
Hi, this is a relatively simple library that solves a very common and frustrating JS issue. With my current workload, it is becoming increasingly difficult to maintain this alone. If you have some basic JS/TS working knowledge, please go thorugh the open bugs/enhancements and help clear the backlog. Thanks in advance! :relieved:

---

## Installation
```javascript
npm install --save js-big-decimal
```

### Usage

:heavy_exclamation_mark: **Note:** Usage has changed since **version 1.1.4**

Require in `javascript` as
```jsavascript
var bigDecimal = require('js-big-decimal');
```
For `typescript`, use
```jsavascript
import bigDecimal require('js-big-decimal');
```
For `web`, when used with script tag, a variable on `Window` object is created.
```html
<script src="node_modules/js-big-decimal/dist/web/js-big-decimal.min.js"></script>
```
```javascript
console.log(bigDecimal.add('12', '45'));
```

If you are only using it on the web and do not wish to get the whole npm package, you can download the file from unpkg as follows:
```html
<script src="https://unpkg.com/js-big-decimal@1.3.1/dist/web/js-big-decimal.min.js"></script>
```

## Operations

### bigDecimal(number)
Create a new object of type BigDecimal. Supports parameters of type `number` and `string`. If string passed cannot be parsed as a number error is thrown. It is recommended to use string as it circumvents the issue of precision with JS native `float` implementation and max limit for `integer`.

It supports exponentiation, but only with integral exponent.

```javascript
var n1 = new bigDecimal(12.6789);
var n2 = new bigDecimal("12345.6789");
var n3 = new bigDecimal('12.456e3'); // 12456
```

### getValue()
Returns the string value of the decimal.
```javascript
console.log(n2.getValue()); // "12345.6789"
```

### setValue()
Allows setting the BigDecimal to a new value.
```js
var n = new bigDecimal('123');
n.setvalue('567');
console.log(n.getValue()); // 567
```

### getPrettyValue(number, digits, separator)
By default this returns the number in standard number format, comma after every three digits. Both arguments, `digits` - the number of digits (of the integral part) to group by, and `separator` - the character to mark the separation. Example of this can be to format a 16 digit number as _credit card_.
```javascript
var value = bigDecimal.getPrettyValue("12345.6789"); // value = "12,345.6789"
```
Alternately, use the instance property. It returns the result as `string`.
```javascript
var n3 = n2.getPrettyValue(); // n4 = "12,345.6789"

var num = new bigDecimal(1234567890123456)
var card = num.getPrettyValue(4, '-'); // cardNumber = "1234-5678-9012-3456"
```

### round(number, precision, roundingMode)
Returns the rounded value to the specified precision (number of digits after decimal). The default precision is set to 0 and rounding mode set to `HALF_EVEN` if no argument is passed. 
```javascript
var value = bigDecimal.round("123.678", 2); // value = "123.68"
```
Alternately, use the instance property. It returns the result as `bigDecimal`.
```javascript
var n3 = n1.round(2); // n3 = new bigDecimal("12.68")
var n4 = n2.round(); // n4 = new bigDecimal("12346")
```
Passing in a negative argument for digits to round off to returns the nearest multiple of power of 10. If the magnitude of the argument is larger than or equal to the number of digits in the integral part of the number to round, `zero` is returned.
```javascript
var val1 = bigDecimal.round("123.78", -2); // val1 = "100"
var val2 = bigDecimal.round("587", -1); // val2 = "590"
var val3 = bigDecimal.round("123.78", -4); // val3 = "0"
```

Round also supports the following rounding modes (These are same as that of Java 8):
* `CEILING` - Rounding mode to round towards positive infinity.
* `DOWN` - Rounding mode to round towards zero.
* `FLOOR` - Rounding mode to round towards negative infinity.
* `HALF_DOWN` - Rounding mode to round towards "nearest neighbor" unless both neighbors are equidistant, in which case round down.
* `HALF_EVEN` - Rounding mode to round towards the "nearest neighbor" unless both neighbors are equidistant, in which case, round towards the even neighbor.
* `HALF_UP` - Rounding mode to round towards "nearest neighbor" unless both neighbors are equidistant, in which case round up.
* `UNNECESSARY` (!Not Implemented!)- Rounding mode to assert that the requested operation has an exact result, hence no rounding is necessary.
* `UP` - Rounding mode to round away from zero.

Extensive description of the modes can be found at [Rounding Modes](https://docs.oracle.com/javase/8/docs/api/java/math/RoundingMode.html)

```javascript
var num = new bigDecimal("123.657");
var numRound1 = num.round(1, bigDecimal.RoundingModes.DOWN); // "123.6"
var numRound2 = num.round(2, bigDecimal.RoundingModes.CEILING); // "123.66"
```

### abs(number)
Returns the absolute value of a number.
```javascript
var n1 = bigDecimal.abs(12.8) // "12.8"
var n2 = bigDecimal.abs(-12.3) // "12.3"
```
The instance returns the result as new `bigDecimal`
```javascript
var n1 = new bigDecimal(12.8).abs() // bigDecimal(12.8)
var n2 = new bigDecimal(-12.3).abs() // bigDecimal(-12.3)
```

### floor(number)
Returns the whole number nearest but not greater than the input number.
```javascript
var n1 = bigDecimal.floor(12.8) // "12"
var n2 = bigDecimal.floor(-12.3) // "-13"
```
The instance function returns the result as a new `bigDecimal`
```javascript
var n1 = new bigDecimal(12.8).floor() // bigDecimal(12)
var n2 = bigDecimal(-12.3).floor() // bigDecimal(-13)
```

### ceil(number)
Returns the whole number nearest but not lesser than the input number.
```javascript
var n1 = bigDecimal.ceil(12.8) // "13"
var n2 = bigDecimal.ceil(-12.3) // "-12"
```
The instance function returns the result as a new `bigDecimal`
```javascript
var n1 = new bigDecimal(12.8).ceil() // bigDecimal(13)
var n2 = bigDecimal(-12.3).ceil() // bigDecimal(-12)
```

### compareTo(number1, number2)
Compare two numbers. Returns `1, 0 and -1` if `number1 > number2, number1 == number2 and number1 < number2` respectively.
```javascript
var value = bigDecimal.compareTo("23.678", "67.34"); // value = -1
var value = bigDecimal.compareTo("23.678", "23.6780"); // value = 0
var value = bigDecimal.compareTo("123.678", "67.34"); // value = 1
```
Alternately, use the instance property. It returns the result as `Integer`.
```javascript
var n1 = new bigDecimal('1234');
var n2 = new bigDecimal('8765');
var value = n1.compareTo(n2); // value = -1
```

### negate(number)
Returns negation of a given number.
```javascript
var value = bigDecimal.negate("123.678"); // value = "-123.678";
```
Alternately, use the instance property. It returns the result as new `bigDecimal`.
```javascript
var n = new bigDecimal('-1234');
var value = n.negate(); // value = new bigDecimal('1234')
```

### add(augend, addend)
Add two numbers. Pass in negative for subtraction. Ensure parameters are `string`s.
```javascript
var sum = bigDecimal.add("23.678", "67.34"); // sum = "91.018"
var diff = bigDecimal.add("67.34", "-23.678"); // diff = "43.662"
```
Alternately, use the instance property. It returns the result as new `bigDecimal`.
```javascript
var n1 = new bigDecimal('1234');
var n2 = new bigDecimal('8765');
var sum = n1.add(n2); // sum = new bigDecimal('9999')
```

### subtract(minuend, subtrahend)
Subtract one number from another
```javascript
var diff = bigDecimal.subtract("67.34", "23.678"); // diff = "43.662"
```
Alternately, use the instance property. It returns the result as new `bigDecimal`.
```javascript
var n1 = new bigDecimal('12.67');
var n2 = new bigDecimal('130.7');
var diff = n1.subtract(n2); // diff = new bigDecimal('-118.03')
```

### multiply(multiplicand, multiplier)
Multiply two numbers. Ensure parameters are `string`s.
```javascript
var product = bigDecimal.multiply("-0.13", "0.00130"); // product = "-0.000169"
```
Alternately, use the instance property. It returns the result as new `bigDecimal`.
```javascript
var n1 = new bigDecimal('-0.13');
var n2 = new bigDecimal('0.00130');
var product = n1.multiply(n2); // product = new bigDecimal('-0.000169')
```

### divide(dividend, divisor, precision)
Divide two numbers. Pass arguments as `string` if calling on bigDecimal or pass an instance of bigDecimal if calling on object. `precision` is an optional parameter with default value of 8.
```javascript
var quotient = bigDecimal.divide('45', '4', 2); // quotient = '11.25'
```
Alternately, use the instance property. It returns the result as new `bigDecimal`.
```javascript
var n1 = new bigDecimal('45');
var n2 = new bigDecimal('4');
var quotient = n1.divide(n2); // quotient = new bigDecimal('11.25')
```

### modulus(dividend, divisor)
Get the modulus of two numbers, i.e., remainder when the dividend is divided by the divisor. Note that both divisor and dividend need to be integers.
```javascript
var remainder = bigDecimal.modulus('45', '4'); // remainder = '1'
```
Alternately, use the instance property. It returns the result as new `bigDecimal`.
```javascript
var n1 = new bigDecimal('45');
var n2 = new bigDecimal('4');
var remainder = n1.modulus(n2); // remainder = new bigDecimal('1')
```
Further, the result takes the sign of the dividend and the sign of the divisor is ignored. Note that this behaviour is the same as in Java and JavaScript.

# Support the developers :heart: :star: :money_with_wings:
If this library helps you in your organization, you can show some love by giving the repo a star or support by making a nominal monetary contribution.

<a href="https://www.buymeacoffee.com/royniladri" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" width="170"></a>


               
