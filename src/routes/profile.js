import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { getLoggedInHeader, getOrCreateCSRFToken } from '../utilities/authUtilities';
import { deXSS, saneAndValidCommon, saneAndValidKey } from '../utilities/validate';


import { layout } from '../layout';


const profileRoutes = new Hono();

// Middleware for authentication check
const authRequired = async (c, next) => {
    const sessionId = getCookie(c, 'session_id');

    if (!sessionId) {
        return c.redirect('/auth/login');
    }

    const session = c.env.KV_SESSIONS && sessionId ? await c.env.KV_SESSIONS.get(sessionId) : null;
    if (!session) {
        return c.redirect('/auth/login');
    }

    c.set('username', JSON.parse(session).username);
    await next();
};


profileRoutes.use('/*', authRequired);

profileRoutes.get('/dashboard', async (c) => {
    const username = c.get('username') || null;

    const loggedIn = getLoggedInHeader(username);
    const title = 'Profile';

    let userRecord;
    try {
        userRecord = await c.env.DB.prepare("SELECT * FROM users WHERE username = ?")
            .bind(username)
            .first();
    } catch (error) {
        console.error("Database error:", error);
        return c.json({ message: 'Database error' }, 500);
    }


    const { dashboardPage, javaScript } = await import('../pages/profile/dashboard');
    const content = dashboardPage(userRecord);
    const nonce = c.get('secureHeadersNonce');
    const javascript = javaScript(nonce);

    return c.html(layout(title, content, loggedIn, javascript));
});

profileRoutes.get('/settings', async (c) => {
    const csrfToken = await getOrCreateCSRFToken(c);

    const username = c.get('username') || null;

    const loggedIn = getLoggedInHeader(username);
    const title = 'Settings';

    let userRecord;
    try {
        userRecord = await c.env.DB.prepare("SELECT * FROM users WHERE username = ?")
            .bind(username)
            .first();
    } catch (error) {
        console.error("Database error:", error);
        return c.json({ message: 'Database error' }, 500);
    }

    const { settingsPage, javaScript } = await import('../pages/profile/settings');
    const content = settingsPage(userRecord);
    const nonce = c.get('secureHeadersNonce');
    const javascript = javaScript(csrfToken, nonce);

    return c.html(layout(title, content, loggedIn, javascript));
});




// Change Password endpoint
profileRoutes.post("/api/change-password", async (c) => {
    const username = c.get('username') || null;
    const { originalPassword, newPassword } = await c.req.json();

    if (!saneAndValidKey(newPassword)) return c.json({ message: "Invalid input" }, 400);

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

    const isPasswordValid = await bcrypt.compare(originalPassword, userRecord.password);
    if (!isPasswordValid) {
        return c.json({ message: 'Invalid original password' }, 401);
    }

    try {
        await c.env.DB.prepare("UPDATE users SET password = ? WHERE username = ?").bind(newPassword, username).run();
    } catch (e) {
        return c.json({ message: e.message }, 400)
    }

    return c.json({ message: "Password changed" }, 201);
});


///profile/api/change-company
profileRoutes.post("/api/change-company", async (c) => {
    const username = c.get('username') || null;
    const { companyName } = await c.req.json();

    let company = deXSS(companyName);

    if (!saneAndValidCommon(company)) return c.json({ message: "Invalid input" }, 400);

    try {
        await c.env.DB.prepare("UPDATE users SET company = ? WHERE username = ?").bind(company, username).run();
    } catch (e) {
        return c.json({ message: e.message }, 400)
    }

    return c.json({ message: "Company changed" }, 201);
});

export default profileRoutes;