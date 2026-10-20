const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export function isValidGstin(value) {
  const gstin = value?.trim().toUpperCase();
  if (!gstin || !gstinPattern.test(gstin)) return false;

  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const product = chars.indexOf(gstin[i]) * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(product / 36) + (product % 36);
  }

  return chars[(36 - (sum % 36)) % 36] === gstin[14];
}
