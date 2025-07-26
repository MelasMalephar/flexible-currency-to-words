# 💬 Flexible Number to Words Converter

A CommonJS-compatible library to convert numbers to words for currencies. Supports both **Indian** and **Western** number systems with customizable currency units, decimal precision, and more. Handles extremely large numbers (up to **999,999,999,999,999,999**) — ideal for global finance apps.

---

## ✨ Features

- ✅ Converts numbers to words for **any currency** (e.g., Rupees, Dollars, Yen)
- ✅ Supports **Indian** (`12,34,56,789`) and **Western** (`123,456,789`) number formats
- ✅ Customizable options:
  - Currency name (e.g., `RUPEES`, `DOLLARS`)
  - Fractional unit (e.g., `PAISE`, `CENTS`)
  - Decimal precision
  - Output suffix (e.g., `ONLY`)
- ✅ Handles numbers up to **999 QUADRILLION**
- ✅ Graceful handling of invalid inputs
- ✅ 30+ unit tests for edge cases and consistency
- ✅ Fully **Node.js/CommonJS compatible**

---

## 📦 Installation

```bash
npm install flexible-number-to-words
🚀 Usage
js
Copy
Edit
const numberToWord = require('flexible-number-to-words');

// Default: Indian Rupees
console.log(numberToWord(254584.255));
// ➜ TWO LAKH FIFTY-FOUR THOUSAND FIVE HUNDRED EIGHTY-FOUR RUPEES AND TWENTY-SIX PAISE ONLY

// US Dollars with Western format
console.log(numberToWord(254584.255, {
  currency: 'DOLLARS',
  fractionalUnit: 'CENTS',
  numberFormat: 'western'
}));
// ➜ TWO HUNDRED FIFTY-FOUR THOUSAND FIVE HUNDRED EIGHTY-FOUR DOLLARS AND TWENTY-SIX CENTS ONLY

// Large number example
console.log(numberToWord(1234567890123456));
// ➜ ONE ARAB TWENTY-THREE THOUSAND FOUR HUNDRED FIFTY-SIX CRORE SEVENTY-EIGHT LAKH NINETY THOUSAND ONE HUNDRED TWENTY-THREE RUPEES ONLY

// Custom decimal precision
console.log(numberToWord(123456.789, { decimalPlaces: 3 }));
// ➜ ONE LAKH TWENTY-THREE THOUSAND FOUR HUNDRED FIFTY-SIX RUPEES AND SEVEN HUNDRED EIGHTY-NINE PAISE ONLY
⚙️ Options
Option	Type	Description	Default
currency	string	Major unit name (e.g., RUPEES, DOLLARS)	RUPEES
fractionalUnit	string	Minor unit name (e.g., PAISE, CENTS)	PAISE
decimalPlaces	number	Decimal precision to be converted to words	2
numberFormat	string	Format style: 'indian' or 'western'	indian
separator	string	Thousands separator (e.g., ',', '.')	,
suffix	string	Text appended at the end of result	ONLY

🧪 Testing
Run tests using Jest:

bash
Copy
Edit
npm test
Test suite includes:

Edge cases

Decimal rounding

Format validation

Singular/plural correctness

Input sanitization

🤝 Contributing
We welcome contributions! Please open an issue or submit a pull request via GitHub. Add tests for any new features or fixes.

📄 License
MIT License — feel free to use, modify, and distribute.