/** 10-digit Indian mobile without country code; first digit 6–9. */
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

export function sanitizeIndianMobileDigits(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 10);
}

export function isValidIndianMobile(digits: string): boolean {
  return INDIAN_MOBILE_REGEX.test(digits);
}

export const INDIAN_MOBILE_REQUIRED_ERROR = "Enter your mobile number";
export const INDIAN_MOBILE_FORMAT_ERROR =
  "Enter a valid 10-digit Indian mobile number";

/** Max length for ABC / name-style input (letters, digits, spaces). */
export const ALPHANUMERIC_NAME_MAX_LENGTH = 100;

/** Letters, digits, single spaces (no leading-only trim while typing). */
export function sanitizeAlphanumericName(raw: string): string {
  return raw
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/ {2,}/g, " ")
    .slice(0, ALPHANUMERIC_NAME_MAX_LENGTH);
}
