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
                    console.log(`Error of ${Math.abs(expectedSin - testSin)}`);
                    console.log(`${expectedSin} != ${testSin}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        it("[asin] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000;
            let err = 0;

            while (count-- > 0) {
                // const record = Math.random() * 1000;
                const testRecord = (((Math.random() * 2) - 1)).toFixed(5);
                const expectedSin = Math.asin(parseFloat(testRecord));
                const testSin = parseFloat(asin(testRecord));

                if (isNaN(testSin) || Math.abs(expectedSin - testSin) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedSin - testSin)}`);
                    console.log(`${expectedSin} != ${testSin}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        xit("[sinh] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const l = Math.round(Math.min(100, Math.max(Math.ceil(Math.random() * 100), 3)));
                const records = Array(l).fill(0).map(() => Math.random() * 100000).sort((a, b) => a - b);

                const values: number[] = [];
                const counts: number[] = [];

                records.forEach((value) => {
                    let i = values.indexOf(value);
                    if (i === -1) {
                        values.push(value);
                        i = values.indexOf(value);
                        counts[i] = 0;
                    };
                    counts[i]++;
                })

                const m = counts.indexOf(Math.max(...counts));
                const expectedMode = values[m];
                const testMode = parseFloat(mode(records.map((val) => val.toString())));

                if (isNaN(testMode) || Math.abs(expectedMode - testMode) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedMode - testMode)}`);
                    console.log(`${expectedMode} != ${testMode}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });

});