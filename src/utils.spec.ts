import { clamp, invlerp, isAproxOne, isAproxZero, lerp, max, min, sign, step, testTolerance, tolerance } from "./utils";

describe('Utils', function () {
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
    
    describe('testTolerance', function () {
        it("[testTolerance] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const tolerence = '0.'.padEnd(count + 5, '0') + '1';
                if(!testTolerance(tolerence, count)){
                    err++
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });
    
    describe('min', function () {
        it("[min] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const l = Math.round(Math.min(100, Math.max(Math.ceil(Math.random() * 100), 3)));
                const records = Array(l).fill(0).map(() => Math.random() * 100000);
                const testRecords = records.map((val) => val.toString());
                const expectedMin = Math.min(...records);
                const testMin = parseFloat(min(testRecords));

                if (isNaN(testMin) || Math.abs(expectedMin - testMin) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedMin - testMin)}`);
                    console.log(`${expectedMin} != ${testMin}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });

    describe('max', function () {
        it("[max] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const l = Math.round(Math.min(100, Math.max(Math.ceil(Math.random() * 100), 3)));
                const records = Array(l).fill(0).map(() => Math.random() * 100000);
                const testRecords = records.map((val) => val.toString());
                const expectedMax = Math.max(...records);
                const testMax = parseFloat(max(testRecords));

                if (isNaN(testMax) || Math.abs(expectedMax - testMax) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedMax - testMax)}`);
                    console.log(`${expectedMax} != ${testMax}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });

    describe('clamp', function () {
        it("[clamp] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const c = (value, min, max)=>Math.min(max, Math.max(value, min));
                const minMax = [Math.random() * 1000, Math.random() * 1000].sort();
                const value = Math.random() * 2000;
                const expectedClamp = c(value, minMax[0], minMax[1]);
                const testClamp = parseFloat(clamp(value.toString(), minMax[0].toString(), minMax[1].toString()));

                if (isNaN(testClamp) || Math.abs(expectedClamp - testClamp) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedClamp - testClamp)}`);
                    console.log(`${expectedClamp} != ${testClamp}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });

    describe('step', function () {
        it("[step] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const s = (value, step) => Math.floor(value / step) * step;
                const n = Math.random() * 100;
                const value = Math.random() * 2000;
                const expectedStep = s(value, n);
                const testStep = parseFloat(step(value.toString(), n.toString()));

                if (isNaN(testStep) || Math.abs(expectedStep - testStep) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedStep - testStep)}`);
                    console.log(`${expectedStep} != ${testStep}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });

    describe('lerp', function () {
        it("[lerp] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const l = (x, y, n) => ((1 - n) * x) + (n * y);
                const minMax = [Math.random() * 1000, Math.random() * 1000].sort();
                const value = Math.random();
                const expectedLerp = l(minMax[0], minMax[1], value);
                const testLerp = parseFloat(lerp(minMax[0].toString(), minMax[1].toString(), value.toString()));

                if (isNaN(testLerp) || Math.abs(expectedLerp - testLerp) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedLerp - testLerp)}`);
                    console.log(`${expectedLerp} != ${testLerp}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });

    describe('invlerp', function () {
        it("[lerp] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const c = (value)=>Math.min(1, Math.max(value, 0));
                const l = (x, y, n) => c((n - x)/(y - x));

                const minMax = [Math.random() * 1000, Math.random() * 1000].sort();
                const value = Math.random() * 1000;
                const expectedInvlerp = l(minMax[0], minMax[1], value);
                const testInvlerp = parseFloat(invlerp(minMax[0].toString(), minMax[1].toString(), value.toString()));

                if (isNaN(testInvlerp) || Math.abs(expectedInvlerp - testInvlerp) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedInvlerp - testInvlerp)}`);
                    console.log(`${expectedInvlerp} != ${testInvlerp}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });

});