import { pow } from "./pow";
import { stripTrailingZero } from "./stripTrailingZero";

describe("intPow", function () {

    it("should be defined", function () {
        expect(intPow).toBeDefined();
    });

    it("should: 2^2 = 4", function () {
        expect(intPow(2, 2)).toBe("4");
    });

    it("should: -2^2 = 4", function () {
        expect(intPow(-2, 2)).toBe("4");
    });

    it("should: -2^3 = -8", function () {
        expect(intPow(-2, 3)).toBe("-8");
    });

    describe('Negated', function () {

        it("should: -(2^2) = -4", function () {
            expect(intPow(2, 2, true)).toBe("-4");
        });

        it("should: -(-2^2) = -4", function () {
            expect(intPow(2, 2, true)).toBe("-4");
        });

        it("should: -(-2^3) = 8", function () {
            expect(intPow(-2, 3, true)).toBe("8");
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

    describe('should handle fractional exponent', function() {

        it("should: 2^2.5 = 5.65685424949238019520675489683879", function(){
            expect(pow(2, 2.5, false, 32)).toBe("5.65685424949238019520675489683879");
        });

        it("should: 2^.5 = 1.4142135623730950488016887242097", function(){
            expect(pow(2, .5, false, 32)).toBe("1.4142135623730950488016887242097");
        });

        it("should: 2.5^2.2 = 7.50702771238394520776312433499478", function(){
            expect(pow(2.5, 2.2, false, 32)).toBe("7.50702771238394520776312433499478");
        });

        it("should: 2.5^-2.2 = 0.13320851318429970246653555493722", function(){
            expect(pow(2.5, -2.2, false, 32)).toBe("0.13320851318429970246653555493722");
        });

        it("should: -2.5^2.2 = -7.50702771238394520776312433499478", function(){
            expect(pow(-2.5, 2.2, false, 32)).toBe("-7.50702771238394520776312433499478");
        });

        it("should: -2.5^-2.2 = -0.13320851318429970246653555493722", function(){
            expect(pow(-2.5, -2.2, false, 32)).toBe("-0.13320851318429970246653555493722");
        });

    })

    describe('should handle powers of 10', function() {

        it("should: 10^2 = 100", function(){
            expect(pow(10, 2, false, 32)).toBe("100");
        });

        it("should: 10^-2 = .01", function(){
            expect(pow(10, -2, false, 32)).toBe("0.01");
        });

        it("should: 10^.2 = 1.58489319246111348520210137339151", function(){
            expect(pow(10, .2, false, 32)).toBe("1.58489319246111348520210137339151");
        });

        it("should: 10^-.2 = 0.63095734448019324943436013662234", function(){
            expect(pow(10, -.2, false, 32)).toBe("0.63095734448019324943436013662234");
        });

    })


    describe('Special Cases', function () {
        it("should: 2^0 = 1", function () {
            expect(intPow(2, 0)).toBe("1");
        });

        it("should: -2^1 = 2", function () {
            expect(pow(2, 1)).toBe("2");
        });

        it("should: 0^1 = 0", function () {
            expect(pow(0, 1)).toBe("0");
        });

        it("should: 0^0 = 1", function () {
            expect(pow(0, 0)).toBe("1");
        });
    })

    describe("should handle negative exponent", function () {
        it("should: 2^-2 = 0.25", function () {
            expect(pow(2, -2)).toBe("0.25");
        });

        it("should: -2^-2 = 0.25", function () {
            expect(pow(-2, -2)).toBe("0.25");
        });

        it("should: -2^-3 = -0.125", function () {
            expect(pow(-2, -3)).toBe("-0.125");
        });
    })

    describe('Errors and Exceptions', function () {
        it("should throw error", function () {
            expect(() => pow(0, -1)).toThrowError();
        });
    })

});
