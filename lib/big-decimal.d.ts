export declare class bigDecimal {
    private value;
    private static validate(number);
    constructor(number?: string);
    getValue(): string;
    getPrettyValue(digits: any, separator: any): string;
    round(precision: any): any;
    static add(number1: any, number2: any): string;
}
