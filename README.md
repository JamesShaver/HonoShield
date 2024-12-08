# HonoShield: Hono-Based Web Application with Session Management and Authentication

## Overview
This project is a web application built using [Hono](https://hono.dev/), a minimal and fast web framework for Cloudflare Workers. The application features secure user authentication through a D1 database and session management with KV storage. The project includes a modular route structure and protection middleware to safeguard sensitive routes. It also supports CSRF protected user registration, login, logout, and profile management functionalities.

## Features
- **User Authentication**:
  - Authentication is handled through a D1 database with a users table.
  - Passwords are securely stored using `bcryptjs`.
- **Session Management**:
  - Secure session IDs generated using `Nano ID` and stored in Cloudflare Workers KV.
- **Protected Routes**:
  - Middleware ensures authentication for accessing sensitive routes.
- **User Registration**:
  - New user registration functionality with unique usernames.
- **Email Verification**:
  - New account registrations trigger an email verification using the Mailgun API.  
- **Logout Functionality**:
  - Clears sessions and removes cookies upon logout.
- **Custom 404 Page**:
  - Custom 404 error handling for unmatched routes.

## Technologies Used
- **[Hono Framework](https://hono.dev)**: For routing and middleware support.
- **[Cloudflare Workers KV](https://www.cloudflare.com/developer-platform/products/workers-kv)**: For session storage.
- **[D1 Database](https://developers.cloudflare.com/d1)**: For user authentication and data storage.
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: For secure password hashing and comparison.
- **[Nano ID](https://www.npmjs.com/package/nanoid)**: For generating unique session IDs and tokens.
- **[Mailgun API](https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages)**: For sending email verification on registration.


## D1 over KV Record Usage

When building a login system with Cloudflare Workers, D1 is generally the better choice for storing user credentials due to its support for relational databases, transactional operations, and complex queries. D1 is designed to handle structured data effectively, making it well-suited for managing user-related information such as usernames, hashed passwords, and associated metadata (e.g., email addresses, account statuses). With D1, you can enforce constraints like unique keys and relationships between tables, providing a robust framework for managing user authentication securely and efficiently.

In contrast, KV is a highly performant key-value storage system optimized for fast, simple data retrieval. While KV is excellent for caching, static configurations, or session tokens, it lacks support for relational data, query capabilities, and transactional operations. These limitations make KV less secure and less practical for handling sensitive, structured data like user credentials. KV's eventual consistency model could also introduce challenges in scenarios requiring strong consistency, such as simultaneous account updates or password resets.

Another key consideration is security. Storing user credentials demands careful handling, including encryption of sensitive data and ensuring atomicity during updates. D1 provides transactional guarantees, reducing risks like race conditions or partial updates. In contrast, KV would require additional layers of code to simulate these behaviors, increasing development complexity and potential for errors.

For these reasons, D1 is the preferred choice for managing user credentials in a Cloudflare Workers-based login system. It provides a reliable, secure, and maintainable solution for storing and querying sensitive authentication data. KV, while powerful for other use cases, is not a suitable storage backend for critical user credential management.


## Database Schema

The `users` table can be installed as follows:
`npx wrangler d1 execute users --remote --file=schema.sql`

The `users` table in the D1 database is defined as follows:
```sql
CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
fistName TEXT NOT NULL,
lastName TEXT NOT NULL,
company TEXT NOT NULL,
username TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
status INTEGER NOT NULL,
status_message TEXT,
secret_key TEXT,
created_on datetime default current_timestamp,
updated_on datetime default current_timestamp
);
```

## Installation and Setup

 1.  **Clone the Repository**:
`git clone https://github.com/yourusername/hono-web-app.git`
`cd hono-web-app`

 2. **Install Dependencies**:
`npm install`

 3. **Configure Environment Variables**: 
 Create a `.env` file or configure the Cloudflare environment with the following variables:


    KV_SESSIONS=<Your KV Namespace for Sessions>
    REMEMBER_TOKENS=<Your KV Namespace for Remember Me Tokens>
	KV_CSRF=<Your KV Namespace for CSRF Tokens>
	D1_DATABASE=<Your D1 Database Binding>

Create the secrets needed for MailGun and CSRF protection:
`npx wrangler secret put MAILGUN_KEY`

`npx wrangler secret put CSRF_Password`
## Usage

-   **Register**: Access `/auth/register` to create a new user account.
-   **Login**: Access `/auth/login` to sign in, with the option to use "Remember Me" for long-lived sessions.
-   **Logout**: Navigate to `/auth/logout` to clear the session and remove cookies.
-   **Protected Routes**: Access `/profile/dashboard` and `/profile/settings` to view user-specific content (requires login).

## Security Considerations

-   **Session Management**: Uses `Nano ID` for generating secure, unique session and token IDs, with HTTP-only, secure, and `SameSite=Strict` cookie policies.
-   **Password Security**: Utilizes `bcryptjs` for hashing passwords before storing them in the D1 database.
-   **Input Validation**: Custom validation utilities to sanitize user inputs and prevent injection attacks.
-   **Email Verification**: Ensures users confirm their email addresses during registration to prevent fraudulent sign-ups.

## Customizing Error Handling

The custom 404 middleware handles all unmatched routes and displays a friendly error page:

    app.notFound((c) => {
        return c.html(layout('Error', error404Page()), 404);
    });

## Future Improvements

-   **Add multi-factor authentication (MFA)** for improved security.
-   **Implement rate limiting** for additional security.
-   **Expand the use of D1 database** for more comprehensive data management.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.