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


//robots.txt
publicRoutes.get('robots.txt', async (c) => {
    //We don't need to set the header as text/plain because c.text() does it for us
    return c.text(`
        User-agent: *
        Allow: /

        Sitemap: https://honoshield.cdndev.io/sitemap.xml
        `);
});


//sitemap.xml
publicRoutes.get('sitemap.xml', async (c) => {
    c.header("Content-Type", "text/xml");
    return c.body(`
        <urlset
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	<url>
		<loc>https://honoshield.cdndev.io/</loc>
		<lastmod>2024-12-09T06:55:03+00:00</lastmod>
		<priority>1.00</priority>
	</url>
	<url>
		<loc>https://honoshield.cdndev.io/contact</loc>
		<lastmod>2024-12-09T06:55:03+00:00</lastmod>
		<priority>0.80</priority>
	</url>
	<url>
		<loc>https://honoshield.cdndev.io/auth/login</loc>
		<lastmod>2024-12-09T06:55:03+00:00</lastmod>
		<priority>0.80</priority>
	</url>
	<url>
		<loc>https://honoshield.cdndev.io/auth/register</loc>
		<lastmod>2024-12-09T06:55:03+00:00</lastmod>
		<priority>0.80</priority>
	</url>
	<url>
		<loc>https://honoshield.cdndev.io/tos</loc>
		<lastmod>2024-12-09T06:55:03+00:00</lastmod>
		<priority>0.64</priority>
	</url>
</urlset>
`);
});

export default publicRoutes;
