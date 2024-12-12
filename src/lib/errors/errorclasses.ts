/**
 * thrown when the authnication was not successful.
 */
class AuthnicationError extends Error{};

/**
 * thrown when a cookie was not found in the client browser's cookie.
 */
class NoQrCodeIdInCookieError extends Error{};

export {AuthnicationError, NoQrCodeIdInCookieError}