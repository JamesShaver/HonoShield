import { createHash } from 'crypto';
import { getCookie } from 'hono/cookie';

// Function that checks if a CSRF token exists and, if it’s expired or missing, creates a new token
export function getOrCreateCSRFToken(c) {
  const IP = c.req.header('CF-Connecting-IP');
  const Country = c.req.header('CF-IPCountry') || '';
  const UserAgent = c.req.header('User-Agent');

  const expiry = c.env.CSRF.EXPIRY; // 5 minutes in seconds

  // Generate CSRF token string
  const CSRF_String = JSON.stringify({ i: IP, c: Country, u: UserAgent, e: expiry });

  // Generate the token as a hexadecimal hash
  const hash = createHash('sha256');
  hash.update(c.env.CSRF_Password + CSRF_String);
  const CSRF_Token = hash.digest('hex'); // Token in hexadecimal format

  // Store the token in KV storage using the token itself as the key
  c.env.KV_CSRF.put(CSRF_Token, CSRF_Token, { expirationTtl: expiry });

  return CSRF_Token;
}

export const authRequired = async (c, next) => {
    const sessionId = getCookie(c, 'session_id');

    if (!sessionId) {
        return c.redirect('/auth/login');
    }

    const session = c.env.KV_SESSIONS && sessionId ? await c.env.KV_SESSIONS.get(sessionId) : null;
    if (!session) {
        return c.redirect('/auth/login');
    }

    await next();
};


export const getUsername = async (c) => {
  const sessionId = getCookie(c, 'session_id');

  if (!sessionId) {
      return 'Guest';
  }

  const session = c.env.KV_SESSIONS && sessionId ? await c.env.KV_SESSIONS.get(sessionId) : null;
  if (!session) {
      return 'Guest';
  } else {
    return JSON.parse(session).username;
  }

};