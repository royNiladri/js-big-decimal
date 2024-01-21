import { stripTrailingZero } from "./stripTrailingZero";
import { roundOff } from "./round";
import bigDecimal from "./big-decimal";

describe("stripTrailingZero", function () {
  it("should be defined", function () {
    expect(stripTrailingZero).toBeDefined();
  });

  it(`should: 'foo' still becomes 'foo' since it's not valid decimal`, function () {
    expect(stripTrailingZero("foo")).toBe("foo");
  });

  it(`should: '' (empty string) becomes 0`, function () {
    expect(stripTrailingZero("")).toBe("0");
  });

  it(`should: '.' (dot string) becomes 0`, function () {
    expect(stripTrailingZero(".")).toBe("0");
  });

  it("should: 44 becomes 44", function () {
    expect(stripTrailingZero("44")).toBe("44");
  });

  it("should: 00.001200 becomes 0.0012", function () {
    expect(stripTrailingZero("00.001200")).toBe("0.0012");
  });

  it("should: 035.02 becomes 35.02", function () {
    expect(stripTrailingZero("035.02")).toBe("35.02");
  });

  it("should: -50.70 becomes -50.7", function () {
    expect(stripTrailingZero("-50.70")).toBe("-50.7");
  });

  it("should: 0.000 becomes 0", function () {
    expect(stripTrailingZero("0.000")).toBe("0");
  });

  it("should: 000.0 becomes 0", function () {
    expect(stripTrailingZero("000.0")).toBe("0");
  });
  
  it("should: 00000000000000000001.1 becomes 1.1", function () {
    expect(stripTrailingZero("00000000000000000001.1")).toBe("1.1");
  });

  it("should: 1.10000000000000000 becomes 1.1", function () {
    expect(stripTrailingZero("1.10000000000000000")).toBe("1.1");
  });

  it("should: -00000000000000000005.5 becomes -5.5", function () {
    expect(stripTrailingZero("-00000000000000000005.5")).toBe("-5.5");
  });

  it("should: -5.50000000000000000 becomes -5.5", function () {
    expect(stripTrailingZero("-5.50000000000000000")).toBe("-5.5");
  });

  // handle zeros
  it("should: 0.00000 become 0", function () {
    expect(stripTrailingZero("0.00000")).toBe("0");
  });
  it("should: -0.00000 become 0", function () {
    expect(stripTrailingZero("-0.00000")).toBe("0");
  });
  it("should: 000 become 0", function () {
    expect(stripTrailingZero("000")).toBe("0");
  });
  it("should: -000 become 0", function () {
    expect(stripTrailingZero("-000")).toBe("0");
  });


  // Usage in conjugation with rounding
  it("should: result of remove trailing zeroes then rounding 1.550 to 1 digit precision becomes 1.6", function () {
    expect((new bigDecimal("1.550")).stripTrailingZero().round(1).getValue()).toBe("1.6");
  });
  it("should: result of rounding 1.550 to 1 digit precision then remove trailing zeroes becomes 1.6", function () {
    expect((new bigDecimal("1.550")).round(1).stripTrailingZero().getValue()).toBe("1.6");
  });
  it("should: result of remove trailing zeroes then rounding -1.550 to 1 digit precision becomes -1.6", function () {
    expect((new bigDecimal("-1.550")).stripTrailingZero().round(1).getValue()).toBe("-1.6");
  });
  it("should: result of rounding -1.550 to 1 digit precision then remove trailing zeroes becomes -1.6", function () {
    expect((new bigDecimal("-1.550")).round(1).stripTrailingZero().getValue()).toBe("-1.6");
  });    

  // Usage in conjugation with operators
  it("should: 1.50 + 1.50 stripped to 3", function () {
    expect((new bigDecimal("1.50")).add(new bigDecimal("1.50")).stripTrailingZero().getValue()).toBe("3");
  });
  it("should: 4.505 - 0.005 stripped to 4.5", function () {
    expect((new bigDecimal("4.505")).subtract(new bigDecimal("0.005")).stripTrailingZero().getValue()).toBe("4.5");
  });
  it("should: 1.505 * 2 stripped to 3.01", function () {
    expect((new bigDecimal("1.505")).multiply(new bigDecimal("2")).stripTrailingZero().getValue()).toBe("3.01");
  });
  it("should: 4.100 * 2 stripped to 2.05", function () {
    expect((new bigDecimal("4.100")).divide(new bigDecimal("2")).stripTrailingZero().getValue()).toBe("2.05");
  });
});
