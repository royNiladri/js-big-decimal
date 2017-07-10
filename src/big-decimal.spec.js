var bigDecimal = require('../lib/big-decimal').bigDecimal;

describe('BIG-DECIMAL', function () {
    //var bigDecimal = require('./big-decimal');

    it('should be defined', function () {
        expect(bigDecimal).toBeDefined();
    });

    describe('constructor', function () {
        it('should return same value after creating Object', function () {
            var n = new bigDecimal(12.34);
            expect(n.getValue()).toBe('12.34');
        });

        it('should not take non-numeric argument', function () {
            try {
                var n = new bigDecimal('notAnumber');
                expect(true).toBe(false);
            } catch (e) {
                expect(e.toString()).toMatch('Parameter is not a number');
            }
        });

        describe('exponentiation', function () {
            it('should transform 13.45e-5 to 0.0001345', function () {
                var n = new bigDecimal('13.45e-5');
                expect(n.getValue()).toBe('0.0001345');
            });
            it('should transform 13.45e-4 to 0.001345', function () {
                var n = new bigDecimal('13.45e-4');
                expect(n.getValue()).toBe('0.001345');
            });
            it('should transform 13.45e-3 to 0.01345', function () {
                var n = new bigDecimal('13.45e-3');
                expect(n.getValue()).toBe('0.01345');
            });
            it('should transform 13.45e-2 to 0.1345', function () {
                var n = new bigDecimal('13.45e-2');
                expect(n.getValue()).toBe('0.1345');
            });
            it('should transform 13.45e-1 to 1.345', function () {
                var n = new bigDecimal('13.45e-1');
                expect(n.getValue()).toBe('1.345');
            });
            it('should transform 13.45e0 to 13.45', function () {
                var n = new bigDecimal('13.45e0');
                expect(n.getValue()).toBe('13.45');
            });
            it('should transform 13.45e1 to 134.5', function () {
                var n = new bigDecimal('13.45e1');
                expect(n.getValue()).toBe('134.5');
            });
            it('should transform 13.45e2 to 1345', function () {
                var n = new bigDecimal('13.45e2');
                expect(n.getValue()).toBe('1345');
            });
            it('should transform 13.45e+3 to 13450', function () {
                var n = new bigDecimal('13.45e+3');
                expect(n.getValue()).toBe('13450');
            });
            it('should transform 13.45e4 to 134500', function () {
                var n = new bigDecimal('13.45e4');
                expect(n.getValue()).toBe('134500');
            });

            it('should transform 0.1345e2 to 13.45', function () {
                var n = new bigDecimal('0.1345e2');
                expect(n.getValue()).toBe('13.45');
            });
            it('should transform 0.1345e1 to 1.345', function () {
                var n = new bigDecimal('0.1345e1');
                expect(n.getValue()).toBe('1.345');
            });
            it('should transform 0.1345e0 to 0.1345', function () {
                var n = new bigDecimal('0.1345e0');
                expect(n.getValue()).toBe('0.1345');
            });
            it('should transform 0.1345e-1 to 0.01345', function () {
                var n = new bigDecimal('0.1345e-1');
                expect(n.getValue()).toBe('0.01345');
            });
            it('should transform 0.1345e-2 to 0.001345', function () {
                var n = new bigDecimal('0.1345e-2');
                expect(n.getValue()).toBe('0.001345');
            });

            it('should transform 0.0134e2 to 1.34', function () {
                var n = new bigDecimal('0.0134e2');
                expect(n.getValue()).toBe('1.34');
            });
            it('should transform 0.0134e1 to 0.1345', function () {
                var n = new bigDecimal('0.0134e1');
                expect(n.getValue()).toBe('0.134');
            });
            it('should transform 0.0134e0 to 0.0134', function () {
                var n = new bigDecimal('0.0134e0');
                expect(n.getValue()).toBe('0.0134');
            });
            it('should transform 0.0134e-1 to 0.00134', function () {
                var n = new bigDecimal('0.0134e-1');
                expect(n.getValue()).toBe('0.00134');
            });
            it('should transform 0.0134e-2 to 0.000134', function () {
                var n = new bigDecimal('0.0134e-2');
                expect(n.getValue()).toBe('0.000134');
            });
        });
    });

    describe('round', function () {
        it('should round off 12.678 to 12.68 if precision is set to 2', function () {
            var n = new bigDecimal('12.678');
            expect(n.round(2)).toBe('12.68');
        });

        it('should round off 12.678 to 13 if precision is not passed', function () {
            var n = new bigDecimal('12.678');
            expect(n.round()).toBe('13');
        });

        it('should round off 12.2678 to 12 if precision is set to 0', function () {
            var n = new bigDecimal('12.2678');
            expect(n.round(0)).toBe('12');
        });

        it('should round off to throw error if precision is not a number', function () {
            try {
                var n = new bigDecimal('12.2678');
                var r = n.round('zero');
                expect(true).toBeFalsy();
            } catch (e) {
                expect(e).toMatch('Precision is not a number');
            }
        });
    });

    describe('pretty', function () {
        it('should transform 1567866522.26567 to 1,567,866,522.26567 if pretty is called without arguments', function () {
            var n = new bigDecimal('1567866522.26567');
            expect(n.getPrettyValue()).toBe('1,567,866,522.26567');
        });

        it('should transform 1234567890123456 to 1234-5678-9012-3456 if pretty is called with 4, -', function () {
            var n = new bigDecimal('1234567890123456');
            expect(n.getPrettyValue(4, '-')).toBe('1234-5678-9012-3456');
        });
    });

    describe('add', function () {
        it('should produce 23.678+67.34=91.018', function () {
            expect(bigDecimal.add('23.678', '67.34')).toBe('91.018');
        });

        it('should produce -23.678+67.34=43.662', function () {
            expect(bigDecimal.add('-23.678', '67.34')).toBe('43.662');
        });

        it('should produce -23.678-67.34=-91.018', function () {
            expect(bigDecimal.add('-23.678', '-67.34')).toBe('-91.018');
        });

        it('should produce -23.678-67.34=-91.018', function () {
            let bigDecimal1 = new bigDecimal('-23.678');
            expect(new bigDecimal('-23.678').add(new bigDecimal('-67.34')).getValue()).toBe(new bigDecimal('-91.018').getValue());
        });

        it('should produce -23.678=-23.678', function () {
            expect(bigDecimal.add('-23.678')).toBe('-23.678');
        });

        it('should not take non-numeric argument', function () {
            try {
                var sum = bigDecimal.add('notAnumber', '89');
                expect(true).toBe(false);
            } catch (e) {
                expect(e.toString()).toMatch('Parameter is not a number');
            }
        });
    });



    describe('compareTo', function () {
        it('should produce 23.678, 67.34= -1', function () {
            expect(bigDecimal.compareTo('23.678', '67.34')).toBe(-1);
        });
        it('should produce 23.678, -67.34= 1', function () {
            expect(bigDecimal.compareTo('23.678', '-67.34')).toBe(1);
        });
        it('should produce .678, 0.67800= 0', function () {
            expect(bigDecimal.compareTo('.678', '0.67800')).toBe(0);
        });
        it('should produce 23.678, 67.34= -1', function () {
            expect(new bigDecimal('23.678').compareTo(new bigDecimal('67.34'))).toBe(-1);
        });
        it('should produce 23.678, -67.34= 1', function () {
            expect(new bigDecimal('23.678').compareTo(new bigDecimal('-67.34'))).toBe(1);
        });
        it('should produce .678, 0.67800= 0', function () {
            expect(new bigDecimal('.678').compareTo(new bigDecimal('0.67800'))).toBe(0);
        });
    });


    describe('multiply', function () {
        it('should: -12 * 0 = 0', function () {
            expect(new bigDecimal('-12').multiply(new bigDecimal('0')).getValue()).toBe('0');
        });

        it('should: 12 * -0 = 0', function () {
            expect(new bigDecimal('12').multiply(new bigDecimal('-0')).getValue()).toBe('0');
        });


        it('should: -12 * -0 = 0', function () {
            expect(new bigDecimal('-12').multiply(new bigDecimal('-0')).getValue()).toBe('0');
        });
        it('should: -0.0000005 * 13 = -0.0000065', function () {
            expect(new bigDecimal('-0.0000005').multiply(new bigDecimal('13')).getValue()).toBe('-0.0000065');
        });

        it('should: 12 * 13 = 156', function () {
            expect(new bigDecimal('12').multiply(new bigDecimal('13')).getValue()).toBe('156');
        });

        it('should: 13 * 130 = 1690', function () {
            expect(new bigDecimal('13').multiply(new bigDecimal('130')).getValue()).toBe('1690');
        });

        it('should: 0.13 * 0.00130 = 0.000169', function () {
            expect(new bigDecimal('0.13').multiply(new bigDecimal('0.00130')).getValue()).toBe('0.000169');
        });

        it('should: 0.5 * 0.2 = 0.1', function () {
            expect(new bigDecimal('0.5').multiply(new bigDecimal('0.2')).getValue()).toBe('0.1');
        });

        it('should: -0.13 * 0.00130 = -0.000169', function () {
            expect(new bigDecimal('-0.13').multiply(new bigDecimal('0.00130')).getValue()).toBe('-0.000169');
        });

        it('should: 13.0 * 0.00130 = 0.000169', function () {
            expect(bigDecimal.multiply('13.0', '0.00130')).toBe('0.0169');
        });

        it('should: -0.05 * -0.02 = 0.001', function () {
            expect(new bigDecimal('-0.05').multiply(new bigDecimal('-0.02')).getValue()).toBe('0.001');
        });

        it('should: .05 * .02 = 0.001', function () {
            expect(new bigDecimal('.05').multiply(new bigDecimal('.02')).getValue()).toBe('0.001');
        });
    });
})