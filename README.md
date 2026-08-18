# CodeEaseKit

A lightweight JavaScript utility toolkit for developers.

## Installation

```bash
npm install codeeasekit
```

## Quick Start

```javascript
const {
  validateEmail,
  generateOTP,
  formatBytes,
  clamp
} = require('codeeasekit');

console.log(validateEmail('test@example.com'));
console.log(generateOTP(6));
console.log(formatBytes(1048576));
console.log(clamp(10, 0, 5));
```

## Features

### Validators
- validateEmail
- validatePhone
- validatePassword
- isEmpty
- isURL

### Generators
- generateOTP
- generateRandomId
- generatePassword

### Formatters
- formatBytes
- formatCurrency
- formatDate
- capitalize

### Utilities
- sleep
- clamp
- removeDuplicates
- safeJSONParse

## Requirements

Node.js 18 or newer.

## License

MIT