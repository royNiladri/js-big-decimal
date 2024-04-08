import { pow, nthRoot, sqRoot, cbRoot, root4, root5, root10, exp } from "./pow";

describe("Pow", function () {

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
            expect(pow(2, 2, undefined, true)).toBe("-4");
        });

        it("should: -(-2^2) = -4", function () {
            expect(pow(2, 2, undefined, true)).toBe("-4");
        });

        it("should: -(-2^3) = 8", function () {
            expect(pow(-2, 3, undefined, true)).toBe("8");
        });
    })

    describe('handle fractional base', function () {

        it("should: 2.5^2 = 6.25", function () {
            expect(pow(2.5, 2)).toBe("6.25");
        });

        it("should: -2.5^2 = 6.25", function () {
            expect(pow(-2.5, 2)).toBe("6.25");
        });

        it("should: -2.5^3 = 6.25", function () {
            expect(pow(-2.5, 3)).toBe("-15.625");
        });
    })

    describe('should handle fractional exponent', function () {

        it("should: 2^2.5 = 5.65685424949238019520675489683879", function () {
            expect(pow(2, 2.5, 32)).toBe("5.65685424949238019520675489683879");
        });

        it("should: 2^.5 = 1.4142135623730950488016887242097", function () {
            expect(pow(2, .5, 32)).toBe("1.4142135623730950488016887242097");
        });

        it("should: 2.5^2.2 = 7.50702771238394520776312433499478", function () {
            expect(pow(2.5, 2.2, 32)).toBe("7.50702771238394520776312433499478");
        });

        it("should: 2.5^-2.2 = 0.13320851318429970246653555493722", function () {
            expect(pow(2.5, -2.2, 32)).toBe("0.13320851318429970246653555493722");
        });

        it("should: -2.5^2.2 = -7.50702771238394520776312433499478", function () {
            expect(pow(-2.5, 2.2, 32)).toBe("-7.50702771238394520776312433499478");
        });

        it("should: -2.5^-2.2 = -0.13320851318429970246653555493722", function () {
            expect(pow(-2.5, -2.2, 32)).toBe("-0.13320851318429970246653555493722");
        });

    })

    describe('should handle powers of 10', function () {

        it("should: 10^2 = 100", function () {
            expect(pow(10, 2, 32, undefined)).toBe("100");
        });

        it("should: 10^-2 = .01", function () {
            expect(pow(10, -2, 32, undefined)).toBe("0.01");
        });

        it("should: 10^.2 = 1.58489319246111348520210137339151", function () {
            expect(pow(10, .2, 32, undefined)).toBe("1.58489319246111348520210137339151");
        });

        it("should: 10^-.2 = 0.63095734448019324943436013662234", function () {
            expect(pow(10, -.2, 32, undefined)).toBe("0.63095734448019324943436013662234");
        });

    })


    describe('Special Cases', function () {
        it("should: 2^0 = 1", function () {
            expect(pow(2, 0)).toBe("1");
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

describe('Roots', function () {

    describe('nthRoot', function () {

        it("should: 4root2 = 2", function () {
            expect(nthRoot(4, 2)).toBe("2");
        });

        it("should: 9root2 = 9", function () {
            expect(nthRoot(81, 2)).toBe("9");
        });

        it("should: 452root2 = 21.260291625", function () {
            expect(nthRoot(452, 2)).toBe("21.260291625");
        });

        it("should: 452root2 = 21.260...", function () {
            expect(nthRoot(452, 2, 32)).toBe("21.260291625469298815998243829858628");
        });

        it("should: 45.76root3 = 3.576805615", function () {
            expect(nthRoot(45.76, 3)).toBe("3.576805615");
        });

        it("should: 45.76root3 = 3.576...", function () {
            expect(nthRoot(45.76, 3, 32)).toBe("3.576805614696509204554520668745324");
        });

    });

    describe('sqRoot', function () {
        it("sqRoot(4) = '2'", function () {
            expect(sqRoot(4)).toBe('2');
        });
    });

    describe('cbRoot', function () {
        it("cbRoot(27) = '3'", function () {
            expect(cbRoot(27)).toBe('3');
        });
    });

    describe('root4', function () {
        it("root4(16) = '2'", function () {
            expect(root4(16)).toBe('2');
        });
    });

    describe('root5', function () {
        it("root5(243) = '3'", function () {
            expect(root5(243)).toBe('3');
        });
    });

    describe('root10', function () {
        it("root10(1024) = '2'", function () {
            expect(root10(1024)).toBe('2');
        });
    });

    describe('Errors and Exceptions', function () {
        it("should throw error", function () {
            expect(() => nthRoot(4, 3.5)).toThrowError();
        });
    });
});

describe('Exponentials', function () {
    it("exp(4) = '54.59815003314423907811026120286067772760909039824031401964928069315468271580552520804729940109651850639200230030607285363846251536'", function () {
        expect(exp(4)).toBe('54.59815003314423907811026120286067772760909039824031401964928069315468271580552520804729940109651850639200230030607285363846251536');
    });
});
