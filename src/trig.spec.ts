import { mean, median, mode, variance, stdDv } from "./statistics";
import { acos, asin, atan, atan2, cos, cosh, hypot, sin, sinh, tan, tanh } from "./trig";


describe("Trigonometry", function () {
    describe('Validate Methods are Defined', function () {
        it("hypot should be defined", function () {
            expect(hypot).toBeDefined();
        });

        it("sin should be defined", function () {
            expect(sin).toBeDefined();
        });

        it("asin should be defined", function () {
            expect(asin).toBeDefined();
        });

        it("sinh should be defined", function () {
            expect(sinh).toBeDefined();
        });

        it("cos should be defined", function () {
            expect(cos).toBeDefined();
        });

        it("acos should be defined", function () {
            expect(acos).toBeDefined();
        });

        it("cosh should be defined", function () {
            expect(cosh).toBeDefined();
        });

        it("tan should be defined", function () {
            expect(tan).toBeDefined();
        });

        it("atan should be defined", function () {
            expect(atan).toBeDefined();
        });

        it("atan2 should be defined", function () {
            expect(atan2).toBeDefined();
        });

        it("tanh should be defined", function () {
            expect(tanh).toBeDefined();
        });
    });

    describe('Trigonometry Stress Tests', function () {
        it("[sin] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = (((Math.random() * 2) - 1) * (2 * Math.PI)).toFixed(5);
                const expectedSin = Math.sin(parseFloat(testRecord));
                const testSin = parseFloat(sin(testRecord));

                if (isNaN(testSin) || Math.abs(expectedSin - testSin) > 0.00001) {
                    // console.log(`Error of ${Math.abs(expectedSin - testSin)}`);
                    // console.log(`${expectedSin} != ${testSin}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        it("[asin] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 1000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = ((1000 - count) / 1000).toString();
                const expectedAsin = Math.asin(parseFloat(testRecord));
                const testAsin = parseFloat(asin(testRecord));

                if (isNaN(testAsin) || Math.abs(expectedAsin - testAsin) > 0.00001) {
                    // console.log(`Error of ${Math.abs(expectedAsin - testSin)}`);
                    // console.log(`${expectedAsin} != ${testSin}`);
                    err++;
                }
            }
            const successRate = (1000 - err) / 1000;
            expect(successRate).toBeGreaterThanOrEqual(0.999);
        });

        it("[sinh] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = ((10000 - count) / 10000).toString();
                const expectedSinh = Math.sinh(parseFloat(testRecord));
                const testSinh = parseFloat(sinh(testRecord));

                if (isNaN(testSinh) || Math.abs(expectedSinh - testSinh) > 0.00001) {
                    // console.log(`Error of ${Math.abs(expectedSinh - testSinh)}`);
                    // console.log(`${expectedSinh} != ${testSinh}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        it("[cos] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = (((Math.random() * 2) - 1) * (2 * Math.PI)).toFixed(5);
                const expectedCos = Math.cos(parseFloat(testRecord));
                const testCos = parseFloat(cos(testRecord));

                if (isNaN(testCos) || Math.abs(expectedCos - testCos) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedCos - testCos)}`);
                    console.log(`${expectedCos} != ${testCos}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        it("[acos] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 1000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = ((1000 - count) / 1000).toString();
                const expectedAcos = Math.acos(parseFloat(testRecord));
                const testAcos = parseFloat(acos(testRecord));

                if (isNaN(testAcos) || Math.abs(expectedAcos - testAcos) > 0.00001) {
                    // console.log(`Error of ${Math.abs(expectedAcos - testAcos)}`);
                    // console.log(`${expectedAcos} != ${testAcos}`);
                    err++;
                }
            }
            const successRate = (1000 - err) / 1000;
            expect(successRate).toBeGreaterThanOrEqual(0.999);
        });

        it("[cosh] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = ((10000 - count) / 10000).toString();
                const expectedCosh = Math.cosh(parseFloat(testRecord));
                const testCosh = parseFloat(cosh(testRecord));

                if (isNaN(testCosh) || Math.abs(expectedCosh - testCosh) > 0.00001) {
                    // console.log(`Error of ${Math.abs(expectedCosh - testCosh)}`);
                    // console.log(`${expectedCosh} != ${testCosh}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        it("[tan] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = (((Math.random() * 2) - 1) * (2 * Math.PI)).toFixed(5);
                const expectedTan = Math.tan(parseFloat(testRecord));
                const testTan = parseFloat(tan(testRecord));

                if (isNaN(testTan) || Math.abs(expectedTan - testTan) > 0.00001) {
                    // console.log(`Error of ${Math.abs(expectedTan - testTan)}`);
                    // console.log(`${expectedTan} != ${testTan}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        it("[atan] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 1000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = (((Math.random() * 2) - 1) * (2 * Math.PI)).toFixed(5);
                const expectedAtan = Math.atan(parseFloat(testRecord));
                const testAtan = parseFloat(atan(testRecord));

                if (isNaN(testAtan) || Math.abs(expectedAtan - testAtan) > 0.00001) {
                    // console.log(`Error of ${Math.abs(expectedAtan - testAtan)}`);
                    // console.log(`${expectedAtan} != ${testAtan}`);
                    err++;
                }
            }
            const successRate = (1000 - err) / 1000;
            expect(successRate).toBeGreaterThanOrEqual(0.999);
        });

        it("[atan2] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
              err = 0;
            while (count-- > 0) {
              let dividend: any = (
                Math.random() * Math.pow(10, Math.floor(Math.random() * 10))
              ).toFixed(5);
              let divisor: any =
                Math.random() * Math.pow(10, Math.floor(Math.random() * 10));
              if (divisor == 0) {
                count++;
                continue;
              }
              let jsOut = Math.atan2(dividend, divisor)
              let myOut = parseFloat(
                atan2(dividend.toString(), divisor.toString())
              );
              if (isNaN(myOut) || Math.abs(jsOut - myOut) > 0.00001) { // Should account for JS rounding errors and float precision error
                console.log(`Error of ${Math.abs(jsOut - myOut)}`);
                console.log(`${jsOut} != ${myOut}`);
                err++;
              }
            }
            const successRate = (10000 - err)/10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
            // expect(err).toBe(0);
          });

          it("[tanh] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = ((10000 - count) / 10000).toString();
                const expectedTanh = Math.tanh(parseFloat(testRecord));
                const testTanh = parseFloat(tanh(testRecord));

                if (isNaN(testTanh) || Math.abs(expectedTanh - testTanh) > 0.00001) {
                    // console.log(`Error of ${Math.abs(expectedTanh - testTanh)}`);
                    // console.log(`${expectedTanh} != ${testTanh}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });

});