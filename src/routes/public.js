import { Hono } from 'hono';
import { layout } from '../layout';
import { getCookie } from 'hono/cookie';
import { getLoggedInHeader } from '../utilities/authUtilities';

const publicRoutes = new Hono();


publicRoutes.use('*', async (c, next) => {
    let user;
    let session;
    const sessionId = getCookie(c, 'session_id');

    if (sessionId) {
        try {
            session = c.env.KV_SESSIONS && sessionId ? await c.env.KV_SESSIONS.get(sessionId) : null;
            if(session != null) {
                c.set('username', JSON.parse(session).username);
            } else {
                c.set('username', null)
            }
        } catch (error) {
            console.error('Error parsing session:', error);
            c.set('username', user);
        }
    }
    await next();
});


// Home
publicRoutes.get('/', async (c) => {
    const username = c.get('username') || null;

    const loggedIn = getLoggedInHeader(username);


    const title = 'Home';
    const { homePage, javaScript } = await import('../pages/home');
    const content = homePage();
    const nonce=c.get('secureHeadersNonce');
    const javascript = javaScript(nonce);    
    return c.html(layout(title, content, loggedIn, javascript));
});

//Contact
publicRoutes.get('/contact', async (c) => {
    const username = c.get('username') || null;
    const loggedIn = getLoggedInHeader(username);

    const title = 'Contact Us';
    const { contactPage, javaScript } = await import('../pages/contact');
    const content = contactPage();
    const nonce=c.get('secureHeadersNonce');
    const javascript = javaScript(nonce);
    return c.html(layout(title, content, loggedIn, javascript));
});


// TOS
publicRoutes.get('/tos', async (c) => {
    const username = c.get('username') || null;

    const loggedIn = getLoggedInHeader(username);


    const title = 'Home';
    const { tosPage } = await import('../pages/tos');
    const content = tosPage();
    return c.html(layout(title, content, loggedIn));
});


export default publicRoutes;
