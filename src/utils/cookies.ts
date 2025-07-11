// Utility functions for managing cookie consent

export const COOKIE_CONSENT_KEY = 'cookiesAccepted';

/**
 * Check if cookies have been accepted by the user
 */
export const hasAcceptedCookies = (): boolean => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  return consent === 'true';
};

/**
 * Check if cookies have been explicitly declined by the user
 */
export const hasDeclinedCookies = (): boolean => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  return consent === 'false';
};

/**
 * Check if the user has made any choice about cookies
 */
export const hasCookieConsent = (): boolean => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  return consent !== null;
};

/**
 * Set cookie consent
 */
export const setCookieConsent = (accepted: boolean): void => {
  localStorage.setItem(COOKIE_CONSENT_KEY, accepted.toString());
};

/**
 * Clear cookie consent (for testing purposes)
 */
export const clearCookieConsent = (): void => {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
};

/**
 * Initialize analytics or tracking scripts only if cookies are accepted
 */
export const initializeTracking = (): void => {
  if (hasAcceptedCookies()) {
    // Initialize Google Analytics, Facebook Pixel, etc.
    console.log('Initializing tracking scripts...');

    // Example: Google Analytics
    // gtag('config', 'GA_MEASUREMENT_ID');

    // Example: Facebook Pixel
    // fbq('init', 'FACEBOOK_PIXEL_ID');
  }
};
