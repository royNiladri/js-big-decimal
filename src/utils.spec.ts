import { divide } from "./divide";
import { multiply } from "./multiply";
import { alternatingSeries, isAproxOne, isAproxZero, sigma, sign, tolerance } from "./utils";

describe('Utils', function () {
    // describe('sigma', function () {
    //     it("0 + 1 + 2 + 3 = 6", function () {
    //         expect(sigma(0, 3, (n)=>{
    //             return n
    //         })).toBe("6")
    //     });
    //     it("2(0) + 2(1) + 2(2) + 2(3) = 12", function () {
    //         expect(sigma(0, 3, (n)=>{
    //             return multiply(n.toString(), '2')
    //         })).toBe("12")
    //     });
    // });
    // describe('alternatingSeries', function () {
    //     it("where 2/(n + 1) < 10^-3, (2/1) - (2/1) + (2/3) ... (2/n) = 1.38130686096364843050453744294519", function () {
    //         expect(alternatingSeries(1, 3, (n)=>{
    //             return divide('2', n.toString(), 32)
    //         })).toBe("1.38130686096364843050453744294519")
    //     });
    //     it("Throw error if n is less than 1", function () {
    //         let n = 0;
    //         expect(()=>{return alternatingSeries(n, 3, (n)=>{
    //             return divide('2', n.toString(), 32)
    //         })}).toThrowError()
    //     });
    //     it("Throw error if n is fractional", function () {
    //         let n = 2.5;
    //         expect(()=>{return alternatingSeries(n, 3, (n)=>{
    //             return divide('2', n.toString(), 32)
    //         })}).toThrowError()
    //     });
    //     it("Throw error if limit is fractional", function () {
    //         let limit = 2.5;
    //         expect(()=>{return alternatingSeries(1, limit, (n)=>{
    //             return divide('2', n.toString(), 32)
    //         })}).toThrowError()
    //     });
    //     it("Throw error if limit is negative", function () {
    //         let limit = -1;
    //         expect(()=>{return alternatingSeries(1, limit, (n)=>{
    //             return divide('2', n.toString(), 32)
    //         })}).toThrowError()
    //     });
    // });
    describe('tolerance', function () {
        it("should: tolerance(1) = 0.1", function () {
            expect(tolerance(1)).toBe("0.1")
        });
        it("should: tolerance(-1) = 1", function () {
            expect(tolerance(-1)).toBe("10")
        });
        it("should: tolerance(16) = 0.0000000000000001", function () {
            expect(tolerance(16)).toBe("0.0000000000000001")
        });
        it("should: tolerance(-16) = 10000000000000000", function () {
            expect(tolerance(-16)).toBe("10000000000000000")
        });
        it("should: tolerance(0) = 0", function () {
            expect(tolerance(0)).toBe("0")
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
            expect(isAproxOne('1')).toBeTrue();
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
    describe('sign', function () {
        it("sign(1) is 1", function () {
            expect(sign('1')).toBe(1);
        });
        it("sign(-1) is -1", function () {
            expect(sign('-1')).toBe(-1);
        });
        it("sign(0) is 0", function () {
            expect(sign('0')).toBe(0);
        });
        it("sign(7645) is 1", function () {
            expect(sign('7645')).toBe(1);
        });
        it("sign(-7645) is -1", function () {
            expect(sign('-7645')).toBe(-1);
        });
        it("sign(.000864) is 1", function () {
            expect(sign('.000864')).toBe(1);
        });
        it("sign(-0.000864) is -1", function () {
            expect(sign('-0.000864')).toBe(-1);
        });
    });
});