export const homePage = () => `
  <div class="container">
    <h1 class="pt-3">HonoShield</h1>
<h2 id="overview">Overview</h2>
<div class="row">
    <div class="col">
        <p>HonoShield is a web application built using <a href="https://hono.dev/">Hono</a>, a minimal and fast web framework for Cloudflare Workers. The application features secure user authentication through a D1 database and session management with KV storage. The project includes a modular route structure and protection middleware to safeguard sensitive routes. It also supports CSRF protected user registration, login, logout, and profile management functionalities.</p>
    </div>
</div>
<div class="row">
<div class="col">
<h2 id="features">Features</h2>
<ul>
    <li><strong>User Authentication</strong>:
        <ul>
            <li>Authentication is handled through a D1 database with a users table.</li>
            <li>Passwords are securely stored using <code>bcryptjs</code>.</li>
        </ul>
    </li>
    <li><strong>Brute Force Protection</strong>:
        <ul>
            <li>Restricts the number of login attempts a user can make within a specific time frame to slow down attackers.</li>
        </ul>
    </li>
    <li><strong>Session Management</strong>:
        <ul>
            <li>Secure session IDs generated using <code>Nano ID</code> and stored in Cloudflare Workers KV.</li>
        </ul>
    </li>
    <li><strong>Protected Routes</strong>:
        <ul>
            <li>Middleware ensures authentication for accessing sensitive routes.</li>
        </ul>
    </li>
    <li><strong>User Registration</strong>:
        <ul>
            <li>New user registration functionality with unique usernames.</li>
        </ul>
    </li>
    <li><strong>Email Verification</strong>:
        <ul>
            <li>New account registrations trigger an email verification using the Mailgun API. </li>
        </ul>
    </li>
    <li><strong>Logout Functionality</strong>:
        <ul>
            <li>Clears sessions and removes cookies upon logout.</li>
        </ul>
    </li>
    <li><strong>Custom 404 Page</strong>:
        <ul>
            <li>Custom 404 error handling for unmatched routes.</li>
        </ul>
    </li>
</ul>
</div>
<div class="col">
<h2 id="technologies-used">Technologies Used</h2>
<ul>
    <li><strong><a href="https://hono.dev">Hono Framework</a></strong>: A lightweight, serverless framework for building web applications and APIs, providing robust routing and middleware capabilities.</li>
    <li><strong><a href="https://www.cloudflare.com/developer-platform/products/workers-kv">Cloudflare Workers KV</a></strong>: A global, low-latency key-value store for efficient session storage.</li>
    <li><strong><a href="https://developers.cloudflare.com/d1">D1 Database</a></strong>: A scalable and secure database solution for user authentication and data storage, built on Cloudflare's global network.</li>
    <li><strong><a href="https://www.npmjs.com/package/bcryptjs">bcryptjs</a></strong>: A robust library for securely hashing passwords and generating CSRF tokens. It employs the bcrypt algorithm, known for its resistance to brute-force attacks and rainbow table attacks.</li>
    <li><strong><a href="https://www.npmjs.com/package/nanoid">Nano ID</a></strong>: A compact, secure, URL-friendly unique string ID generator for generating session IDs and tokens.</li>
    <li><strong><a href="https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages">Mailgun API</a></strong>: A powerful email delivery service used to send verification emails to new users during registration.</li>
</ul>
</div>
</div>
</div>
`;

export const javaScript = (nonce) => `<script nonce="${nonce}"></script>`;