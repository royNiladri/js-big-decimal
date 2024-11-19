import { factorial, mean, median, mode, stdDv, subfactorial, variance } from "./statistics";


describe("Statistics", function () {
    describe('Validate Methods are Defined', function () {
        it("mean should be defined", function () {
            expect(mean).toBeDefined();
        });

        it("median should be defined", function () {
            expect(median).toBeDefined();
        });

        it("mode should be defined", function () {
            expect(mode).toBeDefined();
        });

        it("variance should be defined", function () {
            expect(variance).toBeDefined();
        });

        it("stdDv should be defined", function () {
            expect(stdDv).toBeDefined();
        });

        it("factorial should be defined", function () {
            expect(factorial).toBeDefined();
        });

        it("subfactorial should be defined", function () {
            expect(subfactorial).toBeDefined();
        });
    });

    describe('Statistics Stress Tests', function () {
        xit("[mean] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const l = Math.min(100, Math.max(Math.floor(Math.random() * 100), 2))
                const records = Array(l).fill(0).map(() => { return (Math.random() * 100000) });
                const testRecords = records.map((val) => { return val.toString() });
                const expectedMean = records.reduce((p, c) => p + c, 0) / l;
                const testMean = parseFloat(mean(testRecords));

                if (isNaN(testMean) || Math.abs(expectedMean - testMean) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedMean - testMean)}`);
                    console.log(`${expectedMean} != ${testMean}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        xit("[median] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const l = Math.round(Math.min(100, Math.max(Math.ceil(Math.random() * 100), 3)));
                const records = Array(l).fill(0).map(() => Math.random() * 100000).sort((a, b) => a - b);
                let testRecords = records.map((val) => val.toString());
                let expectedMedian;

                if (l % 2 == 1) {
                    expectedMedian = records[Math.round(((l + 1) / 2) - 1)]
                } else {
                    let n0 = records[Math.round((l / 2) - 1)];
                    let n1 = records[Math.round(l / 2)];
                    expectedMedian = (n0 + n1) / 2
                }

                const testMedian = parseFloat(median(testRecords));

                if (isNaN(testMedian) || Math.abs(expectedMedian - testMedian) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedMedian - testMedian)}`);
                    console.log(`${expectedMedian} != ${testMedian}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        xit("[mode] STRESS TEST - should return 99.99% or more accurate results", function () {
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

        xit("[variance] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const mean = (r: number[]) => r.reduce((p, c) => p + c, 0) / r.length;

                const l = Math.round(Math.min(100, Math.max(Math.ceil(Math.random() * 100), 3)));
                const records = Array(l).fill(0).map(() => Math.random() * 100000).sort((a, b) => a - b);
                const testRecords = records.map((val) => val.toString());

                const initialMean = mean(records);
                const expectedVariance = mean(records.map((value) => {
                    return (value - initialMean) ** 2;
                }))

                const testVariance = parseFloat(variance(testRecords));

                if (isNaN(testVariance) || Math.abs(expectedVariance - testVariance) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedVariance - testVariance)}`);
                    console.log(`${expectedVariance} != ${testVariance}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });

        xit("[stdDv] STRESS TEST - should return 99.99% or more accurate results", function () {
            let count = 10000,
                err = 0;
            while (count-- > 0) {
                const mean = (r: number[]) => r.reduce((p, c) => p + c, 0) / r.length;

                const l = Math.round(Math.min(100, Math.max(Math.ceil(Math.random() * 100), 3)));
                const records = Array(l).fill(0).map(() => Math.random() * 100000).sort((a, b) => a - b);
                const testRecords = records.map((val) => val.toString());

                const initialMean = mean(records);
                const expectedStdDiv = Math.sqrt(mean(records.map((value) => {
                    return (value - initialMean) ** 2;
                })))

                const testStdDiv = parseFloat(stdDv(testRecords));

                if (isNaN(testStdDiv) || Math.abs(expectedStdDiv - testStdDiv) > 0.00001) {
                    console.log(`Error of ${Math.abs(expectedStdDiv - testStdDiv)}`);
                    console.log(`${expectedStdDiv} != ${testStdDiv}`);
                    err++;
                }
            }
            const successRate = (10000 - err) / 10000;
            expect(successRate).toBeGreaterThanOrEqual(0.9999);
        });
    });

});