import { Hono } from 'hono';
import { some, every, except } from 'hono/combine';
import { secureHeaders, NONCE } from 'hono/secure-headers';

import profileRoutes from './routes/profile';
import authRoutes from './routes/authentication';
import publicRoutes from './routes/public';

import { layout } from './layout';
import { error404Page } from './errors/404';

import { getUsername } from './utilities/authUtilities';

const app = new Hono();

app.use('*', async (c, next) => {
    await some(
        every(
            secureHeaders({
                contentSecurityPolicy: {
                    defaultSrc: ['self', 'honoshield.cdndev.io', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'],
                    baseUri: ['self'],
                    childSrc: ['self'],
                    connectSrc: ['self', 'honoshield.cdndev.io', 'static.cloudflareinsights.com'],
                    fontSrc: ['self', 'https:', 'data:', 'fonts.gstatic.com', 'cdnjs.cloudflare.com'],
                    formAction: ['self', 'honoshield.cdndev.io'],
                    frameAncestors: ['self'],
                    frameSrc: ['self'],
                    imgSrc: ['self', 'honoshield.cdndev.io', 'data:', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com'],
                    manifestSrc: ['self'],
                    mediaSrc: ['self'],
                    objectSrc: ['none'],
                    reportTo: '',
                    scriptSrc: ['self', NONCE, 'honoshield.cdndev.io', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'cdn.datatables.net', 'code.jquery.com'],
                    scriptSrcAttr: ['none'],
                    scriptSrcElem: ['self', NONCE, 'honoshield.cdndev.io', 'unsafe-inline', 'static.cloudflareinsights.com', 'unsafe-inline', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'static.cloudflareinsights.com'],
                    styleSrc: ['self', NONCE, 'honoshield.cdndev.io', 'https:', 'code.jquery.com', 'cdn.datatables.net', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com'],
                    styleSrcAttr: ['none'],
                    styleSrcElem: ['self', 'https:'],
                    upgradeInsecureRequests: [],
                    workerSrc: ['self'],
                },
            }),
            except()
        )
    )(c, async () => {
        c.set('username', await getUsername(c));
        await next();
    });
});



// Use imported route groups
app.route('/profile', profileRoutes);
app.route('/auth', authRoutes);
app.route('/', publicRoutes);

app.notFound((c) => {

    let content = {
        title: 'Page Not Found',
        username: c.get('username') ?? null,
        page: error404Page(),
        javascript: ''
    }
    return c.html(layout(content), 404);
});

export default {
    async fetch(req, env, ctx) {
        return app.fetch(req, env, ctx);
    }
};
