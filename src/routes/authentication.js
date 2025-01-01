import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import { getCookie, setCookie } from 'hono/cookie';
import { deXSS, saneAndValidCommon, saneAndValidKey } from '../utilities/validate';
import { rateLimit, getOrCreateCSRFToken } from '../utilities/authUtilities';
import { userActivation } from '../utilities/mailUtilities';
import { layout } from '../layout';

const authRoutes = new Hono();

async function validateCSRF(c, csrfToken) {
    // Retrieve the stored CSRF token from KV using the token as the key
    const storedCSRF = await c.env.KV_CSRF.get(csrfToken);
    if (!storedCSRF) {
        return c.json({ message: 'CSRF token missing or expired' }, 403);
    }

    // Validate the CSRF token
    const IP = c.req.header('CF-Connecting-IP');
    const Country = c.req.header('CF-IPCountry') || '';
    const UserAgent = c.req.header('User-Agent');
    const CSRF_String = JSON.stringify({ i: IP, c: Country, u: UserAgent, e: c.env.CSRF.EXPIRY });

    return await bcrypt.compare(c.env.CSRF_Password + CSRF_String, storedCSRF);
}


// Login Route
authRoutes.get('/login', async (c) => {
    if (c.get('username') != 'Guest') c.redirect('/auth/logout');

    const csrfToken = getOrCreateCSRFToken(c);
    const { loginPage, javaScript } = await import('../pages/authentication/login');

    const nonce = c.get('secureHeadersNonce');
    let content = {
        username: c.get('username') ?? null,
        title: 'Login',
        page: loginPage(),
        javascript: javaScript(csrfToken, nonce)
    }
    return c.html(layout(content));
});

authRoutes.get('/register', async (c) => {
    if (c.get('username') != 'Guest') c.redirect('/auth/logout');

    const csrfToken = getOrCreateCSRFToken(c);
    const { registerPage, javaScript } = await import('../pages/authentication/register');
    const nonce = c.get('secureHeadersNonce');
    let content = {
        username: c.get('username') ?? null,
        title: 'Register',
        page: registerPage(),
        javascript: javaScript(csrfToken, nonce)
    }
    return c.html(layout(content));
});

authRoutes.get("/activate-user", async (c) => {
    const csrfToken = getOrCreateCSRFToken(c);

    const { activatePage, javaScript } = await import('../pages/authentication/activate');
    let content = {
        username: c.get('username') ?? null,
        title: 'Activate Account',
        page: activatePage(),
        javascript: javaScript(csrfToken, nonce)
    }
    return c.html(layout(content));
});


// Logout route
authRoutes.get('/logout', async (c) => {
    const sessionId = getCookie(c, 'session_id');
    const rememberMeToken = getCookie(c, 'remember_me');

    if (sessionId && c.env.KV_SESSIONS) {
        await c.env.KV_SESSIONS.delete(sessionId);
        await setCookie(c, 'session_id', '', { maxAge: 0, path: '/' });
    }

    if (rememberMeToken && c.env.REMEMBER_TOKENS) {
        await c.env.REMEMBER_TOKENS.delete(`remember_${rememberMeToken}`);
        await setCookie(c, 'remember_me', '', { maxAge: 0, path: '/' });
    }
    return c.redirect('/');
});

// Middleware to rate limit login attempts to 5 per minute per IP address
authRoutes.use('/api/login', (c, next) => rateLimitMiddleware(c.env, 5, 60)(c, next));
authRoutes.post('/api/login', async (c) => {
    const { username, password, csrfToken, rememberMe } = await c.req.json();

    if (!username || !password || !csrfToken) {
        return c.json({ message: 'Username, password, and CSRF token are required' }, 400);
    }

    const isValidCSRF = validateCSRF(c, csrfToken);

    if (!isValidCSRF) {
        return c.json({ message: 'Invalid or expired CSRF token' }, 403);
    }

    // Proceed with user authentication
    let userRecord;
    try {
        userRecord = await c.env.DB.prepare("SELECT * FROM users WHERE username = ?")
            .bind(username)
            .first();
    } catch (error) {
        console.error("Database error:", error);
        return c.json({ message: 'Database error' }, 500);
    }

    if (!userRecord) {
        return c.json({ message: 'Invalid username or password' }, 401);
    }

    //Compare credentials
    const isPasswordValid = await bcrypt.compare(password, userRecord.password);
    if (!isPasswordValid) {
        return c.json({ message: 'Invalid username or password' }, 401);
    }

    // Generate session ID and store the session in KV
    const sessionId = nanoid(32);
    if (!sessionId) {
        return c.json({ message: 'could not create session' }, 401);
    }

    const userId = userRecord.id;
    const session = { userId, username: userRecord.username };
    await c.env.KV_SESSIONS.put(sessionId, JSON.stringify(session), { expirationTtl: c.env.SESSION.EXPIRY });

    try {
        setCookie(c, 'session_id', sessionId, {
            maxAge: 3600,
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
        });
    } catch (error) {
        console.error('Error setting cookie:', error);
        return c.json({ message: 'Failed to set cookie' }, 500);
    }

    if (rememberMe === 'on') {
        const rememberToken = nanoid(32);
        await c.env.REMEMBER_TOKENS.put(`remember_${rememberToken}`, userId, { expirationTtl: 30 * 24 * c.env.SESSION.EXPIRY });

        try {
            setCookie(c, 'remember_me', rememberToken, {
                maxAge: 30 * 24 * c.env.SESSION.EXPIRY,
                httpOnly: true,
                secure: true,
                sameSite: 'Lax',
            });
            console.log('Remember Cookie set successfully');
        } catch (error) {
            console.error('Error setting remember cookie:', error);
            return c.json({ message: 'Failed to set remember cookie' }, 500);
        }
    }

    return c.json({ success: true, message: 'Logged in' });
});


// Register endpoint
authRoutes.post("/api/register", async (c) => {
    const { firstname, lastname, company, email, password, csrfToken } = await c.req.json();

    if (!firstname || !lastname || !company || !email || !password || !csrfToken) {
        return c.json({ message: 'All fields are required' }, 400);
    }

    if (
        !saneAndValidCommon(firstname) ||
        !saneAndValidCommon(lastname) ||
        !saneAndValidCommon(company) ||
        !saneAndValidCommon(email) ||
        !saneAndValidCommon(password)
    ) return c.json({ message: "Invalid input" }, 400);

    const isValidCSRF = validateCSRF(c, csrfToken);

    if (!isValidCSRF) {
        return c.json({ message: 'Invalid or expired CSRF token' }, 403);
    }

    const userKey = `${deXSS(email)}`;
    const existingUser = await c.env.DB.prepare("SELECT * FROM users WHERE username = ?")
        .bind(userKey)
        .first();

    if (existingUser) {
        return c.json({ message: "User already exists" }, 409);
    } else {

        const hashedPassword = await bcrypt.hash(password, 10);
        const secret_key = nanoid(32);

        const stmt = c.env.DB.prepare("INSERT INTO users (firstName, lastName, company, username, password, status, secret_key) VALUES (?, ?, ?, ?, ?, ?, ?)");
        await stmt.bind(userKey, hashedPassword, 0, secret_key).run();

        const response = await userActivation(c.env, userKey, secret_key);
        return response.ok ? c.json({ message: "User registered" }) : c.json({ message: 'Failed to send email: ' + sendEmail.statusText }, 500);
    }
});


// Activate User endpoint
authRoutes.post("/api/activate-user", async (c) => {
    const { secret_key } = await c.req.json();

    if (!saneAndValidKey(secret_key)) return c.json({ message: "Invalid input" }, 400);

    const secretkey = `${deXSS(secret_key)}`;
    const activeUser = await c.env.DB.prepare("SELECT * FROM users WHERE secret_key = ? AND status = 1")
        .bind(secretkey)
        .first();

    if (activeUser) return c.json({ message: "Invalid Key" }, 409);

    try {
        await c.env.DB.prepare("UPDATE users SET status = 1 WHERE secret_key = ?").bind(secret_key).run();
    } catch (e) {
        return c.json({ message: e.message }, 400)
    }

    return c.json({ message: "User Activated" }, 201);
});

export default authRoutes;