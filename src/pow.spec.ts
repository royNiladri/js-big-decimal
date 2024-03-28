import { NonIntegerExponentError, intPow } from "./pow";

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

    describe('Special Cases', function () {
        it("should: 2^0 = 1", function () {
            expect(intPow(2, 0)).toBe("1");
        });

        it("should: -2^1 = 2", function () {
            expect(intPow(2, 1)).toBe("2");
        });
    })

    describe('Errors and Exceptions', function () {
        it("should throw error", function () {
            expect(()=>{intPow(2, 2.5)}).toThrowError();
        });

    })

});
