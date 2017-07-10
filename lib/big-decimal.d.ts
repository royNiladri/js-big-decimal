export declare class bigDecimal {
    private value;
    private static validate(number);
    constructor(number?: string);
    getValue(): string;
    getPrettyValue(digits: any, separator: any): string;
    round(precision: any): any;
    static add(number1: any, number2: any): string;
    add(number: bigDecimal): bigDecimal;
    static subtract(number1: any, number2: any): string;
    subtract(number: bigDecimal): bigDecimal;
    static multiply(number1: any, number2: any): string;
    multiply(number: bigDecimal): bigDecimal;
    static divide(number1: any, number2: any): any;
    divide(number: bigDecimal): bigDecimal;
    static compareTo(number1: any, number2: any): 0 | 1 | -1;
    compareTo(number: bigDecimal): 0 | 1 | -1;
}
