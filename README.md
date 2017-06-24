# JS Big Decimal

[![Travis](https://img.shields.io/travis/royNiladri/js-big-decimal.svg?style=flat-square)](https://travis-ci.org/royNiladri/js-big-decimal)
[![license](https://img.shields.io/github/license/royNiladri/js-big-decimal.svg?style=flat-square)](https://github.com/royNiladri/js-big-decimal/blob/master/LICENSE)

Work with large numbers on the client side with high precision.

## Operations

### `bigDecimal(number)`
Create a new objet of type BigDecimal. Supports parameters of type `number` and `string`. If string passed cannot be parsed as a number error is thrown. It is recommended to use string as it circumvents the issue of precision with JS native `float` implementation and max limit for `integer`.
```javascript
var n1 = new bigDecimal(12.6789);
var n2 = new bigDecimal("12345.6789");
```

### `getValue()`
Returns the string value of the decimal.
```javascript
console.log(n2.getValue()); // "12345.6789"
```

### `getPrettyValue(digits, separator)`
By default this returns the number in standard number format, comma after every three digts. Both arguments, `digits` - the number of digits (of the integral part) to group by, and `separator` - the character to mark the separation. Example of this can be to format a 16 digit number as _credit card_.
```javascript
var n3 = n2.getPrettyValue(); // n4 = "12,345.6789"

var num = new bigDecimal(1234567890123456)
var card = num.getPrettyValue(4, '-'); // cardNumber = "1234-5678-9012-3456"
```

### `round(precision)`
Returns the rounded value to the specified precission (number of digits after decimal). The default is set to 0 if no argument is passed.
```javascript
var n3 = n1.round(2); // n3 = "12.68"
var n4 = n2.round(); // n4 = "12346" 
```