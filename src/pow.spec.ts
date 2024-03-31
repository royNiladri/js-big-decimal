import { NonIntegerExponentError, pow } from "./pow";
import { stripTrailingZero } from "./stripTrailingZero";

describe("pow", function () {

    it("should be defined", function () {
        expect(pow).toBeDefined();
    });

    it("should: 2^2 = 4", function () {
        expect(pow(2, 2)).toBe("4");
    });

    it("should: -2^2 = 4", function () {
        expect(pow(-2, 2)).toBe("4");
    });

    it("should: -2^3 = -8", function () {
        expect(pow(-2, 3)).toBe("-8");
    });

    describe('Negated', function () {

        it("should: -(2^2) = -4", function () {
            expect(pow(2, 2, true)).toBe("-4");
        });

        it("should: -(-2^2) = -4", function () {
            expect(pow(2, 2, true)).toBe("-4");
        });

        it("should: -(-2^3) = 8", function () {
            expect(pow(-2, 3, true)).toBe("8");
        });
    })

    describe('handle fractional base', function() {

        it("should: 2.5^2 = 6.25", function(){
            expect(pow(2.5, 2)).toBe("6.25");
        });

        it("should: -2.5^2 = 6.25", function(){
            expect(pow(-2.5, 2)).toBe("6.25");
        });

        it("should: -2.5^3 = 6.25", function(){
            expect(pow(-2.5, 3)).toBe("-15.625");
        });
    })


    describe('Special Cases', function () {
        it("should: 2^0 = 1", function () {
            expect(pow(2, 0)).toBe("1");
        });

        it("should: -2^1 = 2", function () {
            expect(pow(2, 1)).toBe("2");
        });
    })

    describe("should handle negative exponent", function () {
        it("should: 2^-2 = 0.25", function () {
            expect(stripTrailingZero(pow(2, -2))).toBe("0.25");
        });

        it("should: -2^-2 = 0.25", function () {
            expect(stripTrailingZero(pow(-2, -2))).toBe("0.25");
        });

        it("should: -2^-3 = -0.125", function () {
            expect(stripTrailingZero(pow(-2, -3))).toBe("-0.125");
        });
    })

    describe('Errors and Exceptions', function () {
        it("should throw error", function () {
            expect(() => pow(2, 2.5)).toThrowMatching((thrown) => thrown.message===NonIntegerExponentError.message);
        });

    })

});
