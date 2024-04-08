import { Euler, factorial, isAproxOne, isAproxZero, tolerance } from "./utils";

describe('Utils', function () {
    describe('factorial', function () {
        it("should: 1! = 1", function () {
            expect(factorial("1")).toBe("1")
        });
        it("should: 0! = 1", function () {
            expect(factorial("0")).toBe("1")
        });
        it("should: 52! = 80658175170943878571660636856403766975289505440883277824000000000000", function () {
            expect(factorial("52")).toBe("80658175170943878571660636856403766975289505440883277824000000000000")
        });
    });
    describe('tolerance', function () {
        it("should: tolerance(1) = 0.1", function () {
            expect(tolerance(1)).toBe("0.1")
        });
        it("should: tolerance(-1) = 1", function () {
            expect(tolerance(-1)).toBe("1")
        });
        it("should: tolerance(16) = 0.000000000000001", function () {
            expect(tolerance(16)).toBe("0.000000000000001")
        });
        it("should: tolerance(-16) = 1000000000000000", function () {
            expect(tolerance(-16)).toBe("1000000000000000")
        });
        it("should: tolerance(0) = 0", function () {
            expect(tolerance(0)).toBe("0")
        });
    });
    describe('Euler', function () {
        it("should: Euler() = 2.71828...5266", function () {
            expect(Euler()).toBe("2.71828182845904523536028747135266")
        });
        it("should: Euler(1) = 2.7182818284590423", function () {
            expect(Euler(1)).toBe("2.7182818284590423")
        });
        it("should: Euler(10) = 2.7182818284590423", function () {
            expect(Euler(10)).toBe("2.7182818284590423")
        });
        it("should: Euler(50) = 2.71828182845904523536028747135266249775724709369996", function () {
            expect(Euler(50)).toBe("2.71828182845904523536028747135266249775724709369996")
        });
        it("should: Euler(100) = 2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274", function () {
            expect(Euler(100)).toBe("2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274")
        });
    });
    describe('isAproxZero', function () {
        it("should: isAproxZero(0) is true", function () {
            expect(isAproxZero(0)).toBeTrue();
        });
        it("should: isAproxZero(0.0000001) is true", function () {
            expect(isAproxZero('0.0000001')).toBeTrue();
        });
        it("should: isAproxZero(0.000000000000764658) is true", function () {
            expect(isAproxZero('0.000000000000764658')).toBeTrue();
        });
        it("should: isAproxZero(0.1) is fasle", function () {
            expect(isAproxZero('0.1')).toBeFalse();
        });
        it("should: isAproxZero(0.001) is fasle", function () {
            expect(isAproxZero('0.001')).toBeFalse();
        });
        it("should: isAproxZero(0.005643) is fasle", function () {
            expect(isAproxZero('0.005643')).toBeFalse();
        });
    });
    describe('isAproxOne', function () {
        it("should: isAproxOne(1) is true", function () {
            expect(isAproxOne(1)).toBeTrue();
        });
        it("should: isAproxOne(1.0000001) is true", function () {
            expect(isAproxOne('1.0000001')).toBeTrue();
        });
        it("should: isAproxOne(-1.0000001) is true", function () {
            expect(isAproxOne('-1.0000001')).toBeTrue();
        });
        it("should: isAproxOne(1.1) is fasle", function () {
            expect(isAproxOne('1.1')).toBeFalse();
        });
        it("should: isAproxOne(-1.1) is fasle", function () {
            expect(isAproxOne('-1.1')).toBeFalse();
        });
        it("should: isAproxOne(1.001) is fasle", function () {
            expect(isAproxOne('1.001')).toBeFalse();
        });
        it("should: isAproxOne(-1.001) is fasle", function () {
            expect(isAproxOne('-1.001')).toBeFalse();
        });
        it("should: isAproxOne(1.005643) is fasle", function () {
            expect(isAproxOne('1.005643')).toBeFalse();
        });
        it("should: isAproxOne(-1.005643) is fasle", function () {
            expect(isAproxOne('-1.005643')).toBeFalse();
        });
    });
});