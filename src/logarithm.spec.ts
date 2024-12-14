import { Euler, exp, expm1, ln, ln2, log } from "./logarithm";
// import { tolerance, isAproxZero, isAproxOne, testTolerance, min, max, clamp, step, lerp, invlerp } from "./utils";

describe('Logarithm', function () {
    
    describe('Euler', function () {
        it("should: 2.7182818284590452353602874713526624977572470936999595749669676277", function () {
            expect(Euler()).toBe("2.7182818284590452353602874713526624977572470936999595749669676277");
        });
        it("should: 2.7182818284590452", function () {
            expect(Euler(16)).toBe("2.7182818284590452");
        });
        it("should: 2.7182818284590452", function () {
            expect(Euler(8)).toBe("2.7182818284590452");
        });
    });

    describe('exp', function () {
        it("should: exp('1') = 2.71828182845904523536028747135266", function () {
            expect(exp('1')).toBe("2.71828182845904523536028747135266");
        });
        it("should: exp('5') = 148.41315910257660342111558004055228", function () {
            expect(exp('5')).toBe("148.41315910257660342111558004055228");
        });
        it("should: exp('54.678') = 557639695662562173349415.94838912836144880725532501258611", function () {
            expect(exp('54.678')).toBe("557639695662562173349415.94838912836144880725532501258611");
        });
        it("should: exp('-54.678') = 0.00000000000000000000000179327262", function () {
            expect(exp('-54.678')).toBe("0.00000000000000000000000179327262");
        });
        it("should: exp('100') = 26881171418161354484126255515800135873611118.7737...3491", function () {
            expect(exp('100')).toBe("26881171418161354484126255515800135873611118.77374192241519160861528028703491");
        });
    });

    describe('expm1', function () {
        it("should: expm1('1') = 1.71828182845904523536028747135266", function () {
            expect(expm1('1')).toBe("1.71828182845904523536028747135266");
        });
        it("should: expm1('5') = 147.41315910257660342111558004055228", function () {
            expect(expm1('5')).toBe("147.41315910257660342111558004055228");
        });
        it("should: expm1('54.678') = 557639695662562173349414.94838912836144880725532501258611", function () {
            expect(expm1('54.678')).toBe("557639695662562173349414.94838912836144880725532501258611");
        });
        it("should: expm1('-54.678') = -0.99999999999999999999999820672738", function () {
            expect(expm1('-54.678')).toBe("-0.99999999999999999999999820672738");
        });
        it("should: expm1('100') = 26881171418161354484126255515800135873611117.7737...3491", function () {
            expect(expm1('100')).toBe("26881171418161354484126255515800135873611117.77374192241519160861528028703491");
        });
    });

    describe('ln', function () {
        it("should: ln('1') = 0", function () {
            expect(ln('1')).toBe("0");
        });
        it("should: expm1('5') = 1.6094....8915", function () {
            expect(ln('5')).toBe("1.6094379124341003746007593332261876395256013542685177219126478915");
        });
        it("should: expm1('54.678') = 4.0014....9346", function () {
            expect(ln('54.678')).toBe("4.0014614347420447753123388599209288277093448067145506843096589346");
        });
        it("should: expm1('100') = 4.6051....8019", function () {
            expect(ln('100')).toBe("4.6051701859880913680359829093687284152022029772575459520666558019");
        });
        it("should throw error", function () {
            expect(() => ln('-1')).toThrowError();
        });
    });

    describe('log', function () {
        it("should: log('1') = 0", function () {
            expect(log('1')).toBe("0");
        });
        it("should: log('5') = 1.6094....8915", function () {
            expect(log('5')).toBe("1.6094379124341003746007593332261876395256013542685177219126478915");
        });
        it("should: log('54.678') = 4.0014....9346", function () {
            expect(log('54.678')).toBe("4.0014614347420447753123388599209288277093448067145506843096589346");
        });
        it("should: log('100') = 4.6051....8019", function () {
            expect(log('100')).toBe("4.6051701859880913680359829093687284152022029772575459520666558019");
        });
        it("should throw error", function () {
            expect(() => log('-1')).toThrowError();
        });
    });

    describe('ln2', function () {
        it("should: ln2('1') = 0", function () {
            expect(ln2('1')).toBe("0");
        });
        it("should: ln2('2') = 1", function () {
            expect(ln2('2')).toBe("1");
        });
        it("should: ln2('32') = 5", function () {
            expect(ln2('32')).toBe("5");
        });
        it("should: ln2('100') = 6.6438....7917", function () {
            expect(ln2('100')).toBe("6.6438561897747246957406388589787803517296627860491612241095127917");
        });
        it("should throw error", function () {
            expect(() => ln2('-1')).toThrowError();
        });
    });

});