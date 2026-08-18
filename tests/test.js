'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  validateEmail,
  validatePhone,
  validatePassword,
  isEmpty,
  isURL,
  generateOTP,
  generateRandomId,
  generatePassword,
  formatBytes,
  formatCurrency,
  formatDate,
  capitalize,
  sleep,
  clamp,
  removeDuplicates,
  safeJSONParse
} = require('../src');

test('validateEmail should validate common email addresses', () => {
  assert.equal(validateEmail('test@example.com'), true);
  assert.equal(validateEmail('invalid-email'), false);
});

test('validatePhone should validate phone numbers', () => {
  assert.equal(validatePhone('9820710392'), true);
  assert.equal(validatePhone('+91 98207 10392'), true);
  assert.equal(validatePhone('123'), false);
});

test('validatePassword should enforce strong password rules', () => {
  assert.equal(validatePassword('Strong@123'), true);
  assert.equal(validatePassword('weakpass'), false);
});

test('isEmpty should detect empty values', () => {
  assert.equal(isEmpty('   '), true);
  assert.equal(isEmpty([]), true);
  assert.equal(isEmpty({}), true);
  assert.equal(isEmpty('hello'), false);
});

test('isURL should validate URLs', () => {
  assert.equal(isURL('https://example.com'), true);
  assert.equal(isURL('not-a-url'), false);
});

test('generateOTP should create numeric OTP strings of the expected length', () => {
  const otp = generateOTP(6);
  assert.equal(otp.length, 6);
  assert.match(otp, /^\d{6}$/);
});

test('generateRandomId should produce alphanumeric IDs of the expected length', () => {
  const id = generateRandomId(16);
  assert.equal(id.length, 16);
  assert.match(id, /^[A-Za-z0-9]+$/);
});

test('generatePassword should create a secure password of the expected length', () => {
  const password = generatePassword(12);
  assert.equal(password.length, 12);
  assert.equal(validatePassword(password), true);
});

test('formatBytes should convert bytes into human readable sizes', () => {
  assert.equal(formatBytes(0), '0 Bytes');
  assert.equal(formatBytes(1024), '1 KB');
  assert.equal(formatBytes(1048576), '1 MB');
});

test('formatCurrency should format currency amounts', () => {
  const result = formatCurrency(1000, 'INR');
  assert.equal(typeof result, 'string');
  assert.match(result, /1,000/);
});

test('formatDate should format dates consistently', () => {
  const result = formatDate('2026-08-18');
  assert.equal(typeof result, 'string');
  assert.ok(result.length > 0);
});

test('capitalize should title case simple text', () => {
  assert.equal(capitalize('hello world'), 'Hello World');
});

test('sleep should resolve after a delay', async () => {
  const start = Date.now();
  await sleep(20);
  assert.ok(Date.now() - start >= 15);
});

test('clamp should keep values within the range', () => {
  assert.equal(clamp(10, 0, 5), 5);
  assert.equal(clamp(-1, 0, 5), 0);
  assert.equal(clamp(3, 0, 5), 3);
});

test('removeDuplicates should remove repeated values while preserving order', () => {
  assert.deepEqual(removeDuplicates([1, 2, 2, 3, 1]), [1, 2, 3]);
});

test('safeJSONParse should parse valid JSON and return fallback for invalid input', () => {
  assert.deepEqual(safeJSONParse('{"name":"CodeEaseKit"}'), {
    name: 'CodeEaseKit'
  });
  assert.equal(safeJSONParse('invalid', 'fallback'), 'fallback');
});
