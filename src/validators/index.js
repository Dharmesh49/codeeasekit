'use strict';

function validateEmail(email) {
  if (typeof email !== 'string') return false;
  const value = email.trim();
  if (!value || value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(phone) {
  if (typeof phone !== 'string' && typeof phone !== 'number') return false;
  const value = String(phone).replace(/[\s()+-]/g, '');
  return /^\d{10,15}$/.test(value);
}

function validatePassword(password) {
  if (typeof password !== 'string') return false;
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

function isURL(value) {
  if (typeof value !== 'string' || !value.trim()) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

module.exports = {
  validateEmail,
  validatePhone,
  validatePassword,
  isEmpty,
  isURL
};
