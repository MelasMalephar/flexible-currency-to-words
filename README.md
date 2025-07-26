Flexible Number to Words Converter
A CommonJS-compatible library to convert numbers to words for currencies, with support for Indian and Western number formats, customizable currency units, decimal places, and an extended range up to 999,999,999,999,999,999 (arab crore). Ideal for financial applications and multi-currency scenarios.
Features

Converts numbers to words for any currency (e.g., Rupees, Dollars).
Supports Indian (12,34,56,789) and Western (123,456,789) number formats.
Customizable decimal places and fractional unit names (e.g., Paise, Cents).
Handles numbers up to 999,999,999,999,999,999.
CommonJS module for easy integration with Node.js.
Configurable separators and suffixes.

Installation
npm install flexible-number-to-words

Usage
const numberToWord = require('flexible-number-to-words');

// Default: Indian Rupees
console.log(numberToWord(254584.255));
// Output: TWO LAKH FIFTY-FOUR THOUSAND FIVE HUNDRED AND EIGHTY-FOUR RUPEES AND TWENTY-SIX PAISE ONLY

// Custom currency: US Dollars
console.log(numberToWord(254584.255, {
    currency: 'DOLLARS',
    fractionalUnit: 'CENTS',
    numberFormat: 'western'
}));
// Output: TWO LAKH FIFTY-FOUR THOUSAND FIVE HUNDRED AND EIGHTY-FOUR DOLLARS AND TWENTY-SIX CENTS ONLY

// Extended range
console.log(numberToWord(1234567890123456));
// Output: ONE ARAB TWENTY-THREE THOUSAND FOUR HUNDRED FIFTY-SIX CRORE SEVENTY-EIGHT LAKH NINETY THOUSAND ONE HUNDRED AND TWENTY-THREE RUPEES ONLY

// Custom decimal places and separator
console.log(numberToWord(123456.789, {
    decimalPlaces: 3,
    separator: '.'
}));
// Output: ONE LAKH TWENTY-THREE THOUSAND FOUR HUNDRED AND FIFTY-SIX RUPEES AND SEVEN HUNDRED EIGHTY-NINE PAISE ONLY

Options



Option
Description
Default



currency
Currency name (e.g., RUPEES, DOLLARS)
RUPEES


fractionalUnit
Fractional unit name (e.g., PAISE, CENTS)
PAISE


decimalPlaces
Number of decimal places
2


numberFormat
Number format ('indian' or 'western')
indian


separator
Separator for number formatting (e.g., ',' or '.')
,


suffix
Text to append at the end
ONLY


Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.
License
MIT License
