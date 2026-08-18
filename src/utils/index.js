'use strict';

function sleep(ms) {
  if (typeof ms !== 'number' || Number.isNaN(ms) || ms < 0) {
    return Promise.reject(new TypeError('ms must be a non-negative number'));
  }

  return new Promise(resolve => setTimeout(resolve, ms));
}

function clamp(number, min, max) {
  if (![number, min, max].every(Number.isFinite)) {
    throw new TypeError('number, min and max must be finite numbers');
  }

  if (min > max) {
    throw new RangeError('min cannot be greater than max');
  }

  return Math.min(Math.max(number, min), max);
}

function removeDuplicates(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must be an array');
  }

  return [...new Set(array)];
}

function safeJSONParse(value, fallback = null) {
  if (typeof value !== 'string') return fallback;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

module.exports = {
  sleep,
  clamp,
  removeDuplicates,
  safeJSONParse
};
