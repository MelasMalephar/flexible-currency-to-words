declare module 'flexible-currency-to-words' {
  interface Options {
    currency?: string;
    fractionalUnit?: string;
    suffix?: string;
    decimalPlaces?: number;
    numberFormat?: 'indian' | 'western';
  }

  function numberToWord(value: number, options?: Options): string;

  export = numberToWord;
}