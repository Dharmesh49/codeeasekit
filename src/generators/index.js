'use strict';

const crypto = require('crypto');

function generateOTP(length = 6) {
  if (!Number.isInteger(length) || length < 1 || length > 20) {
    throw new RangeError('OTP length must be an integer between 1 and 20');
  }

  let otp = '';
  for (let i = 0; i < length; i += 1) {
    otp += crypto.randomInt(0, 10);
  }
  return otp;
}

function generateRandomId(length = 16) {
  if (!Number.isInteger(length) || length < 1 || length > 256) {
    throw new RangeError('ID length must be an integer between 1 and 256');
  }

  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += chars[crypto.randomInt(0, chars.length)];
  }
  return result;
}

function generatePassword(length = 12) {
  if (!Number.isInteger(length) || length < 8 || length > 256) {
    throw new RangeError('Password length must be an integer between 8 and 256');
  }

  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const all = upper + lower + numbers + symbols;

  const chars = [
    upper[crypto.randomInt(0, upper.length)],
    lower[crypto.randomInt(0, lower.length)],
    numbers[crypto.randomInt(0, numbers.length)],
    symbols[crypto.randomInt(0, symbols.length)]
  ];

  while (chars.length < length) {
    chars.push(all[crypto.randomInt(0, all.length)]);
  }

  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(0, i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}

module.exports = {
  generateOTP,
  generateRandomId,
  generatePassword
};
