'use strict';

const assert = require('node:assert/strict');
const kit = require('codeeasekit');

const expectedFunctions = [
  'validateEmail',
  'validatePhone',
  'validatePassword',
  'isEmpty',
  'isURL',
  'generateOTP',
  'generateRandomId',
  'generatePassword',
  'formatBytes',
  'formatCurrency',
  'formatDate',
  'capitalize',
  'sleep',
  'clamp',
  'removeDuplicates',
  'safeJSONParse'
];

for (const name of expectedFunctions) {
  assert.equal(typeof kit[name], 'function', `${name} should be exported by codeeasekit`);
}

assert.equal(kit.validateEmail('test@example.com'), true);
assert.equal(kit.validateEmail('invalid-email'), false);
assert.match(kit.generateOTP(6), /^\d{6}$/);

console.log('CodeEaseKit VS Code extension smoke test passed.');
