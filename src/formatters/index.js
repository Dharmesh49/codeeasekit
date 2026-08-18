'use strict';

function formatBytes(bytes, decimals = 2) {
  if (typeof bytes !== 'number' || Number.isNaN(bytes) || bytes < 0) {
    throw new TypeError('bytes must be a non-negative number');
  }

  if (bytes === 0) return '0 Bytes';

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const base = 1024;
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(base)),
    units.length - 1
  );

  const value = bytes / Math.pow(base, index);
  return `${Number(value.toFixed(Math.max(0, decimals)))} ${units[index]}`;
}

function formatCurrency(amount, currency = 'INR', locale = 'en-IN') {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    throw new TypeError('amount must be a valid number');
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}

function formatDate(date, locale = 'en-IN') {
  const parsed = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    throw new TypeError('Invalid date');
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(parsed);
}

function capitalize(text) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }

  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

module.exports = {
  formatBytes,
  formatCurrency,
  formatDate,
  capitalize
};
