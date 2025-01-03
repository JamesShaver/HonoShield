
# HonoShield: Hono-Based Web Application with Session Management and Authentication


## Overview
This project is a web application built using [Hono](https://hono.dev/), a minimal and fast web framework for Cloudflare Workers. The application features secure user authentication through a D1 database and session management with KV storage. The project includes a modular route structure and protection middleware to safeguard sensitive routes. It also supports CSRF protected user registration, login, logout, and profile management functionalities.

## Features
* **User Authentication**:
	* Authentication is handled through a D1 database with a users table.
	* Passwords are securely stored using `bcryptjs`.
* **Brute Force Protection**:
	* Restricts the number of login attempts a user can make within a specific time frame to slow down attackers.
* **Session Management**:
	* Secure session IDs generated using `Nano ID` and stored in Cloudflare Workers KV.
* **Protected Routes**:
	* Middleware ensures authentication for accessing sensitive routes.
* **User Registration**:
	* New user registration functionality with unique usernames.
*  **Email Verification**:
	* New account registrations trigger an email verification using the Mailgun API.
*  **Logout Functionality**:
	* Clears sessions and removes cookies upon logout.
*  **Custom 404 Page**:
	* Custom 404 error handling for unmatched routes.

## Technologies Used
-  **[Hono Framework](https://hono.dev)**: For routing and middleware support.
-  **[Cloudflare Workers KV](https://www.cloudflare.com/developer-platform/products/workers-kv)**: For session storage.
-  **[D1 Database](https://developers.cloudflare.com/d1)**: For user authentication and data storage.
-  **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: For secure password hashing and comparison.
-  **[Nano ID](https://www.npmjs.com/package/nanoid)**: For generating unique session IDs and tokens.
-  **[Mailgun API](https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages)**: For sending email verification on registration.

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
	CREATE  TABLE  users (
		id INTEGER  PRIMARY KEY AUTOINCREMENT,
		fistName TEXT  NOT NULL,
		lastName TEXT  NOT NULL,
		company TEXT  NOT NULL,
		username TEXT  UNIQUE  NOT NULL,
		password  TEXT  NOT NULL,
		status  INTEGER  NOT NULL,
		status_message TEXT,
		secret_key TEXT,
		created_on datetime  default current_timestamp,
		updated_on datetime  default current_timestamp
	);
```

## Installation and Setup

*  **Clone the Repository**:
   * `git clone https://github.com/JamesShaver/HonoShield.git`
   * `cd hono-web-app`

*  **Install Dependencies**:
   * `npm install`

* **Create the secrets needed for MailGun and CSRF protection**:
  * `npx wrangler secret put MAILGUN_KEY`
  * `npx wrangler secret put CSRF_Password`

## Usage
*  **Register**: Access `/auth/register` to create a new user account.

*  **Login**: Access `/auth/login` to sign in, with the option to use "Remember Me" for long-lived sessions.

*  **Logout**: Navigate to `/auth/logout` to clear the session and remove cookies.

*  **Protected Routes**: Access `/profile/dashboard` and `/profile/settings` to view user-specific content (requires login).

## Security Considerations  

*  **Session Management**: Uses `Nano ID` for generating secure, unique session and token IDs, with HTTP-only, secure, and `SameSite=Strict` cookie policies.

*  **Password Security**: Utilizes `bcryptjs` for hashing passwords before storing them in the D1 database.

*  **Input Validation**: Custom validation utilities to sanitize user inputs and prevent injection attacks.

*  **Email Verification**: Ensures users confirm their email addresses during registration to prevent fraudulent sign-ups.

## Customizing Error Handling
The custom 404 middleware handles all unmatched routes and displays a friendly error page:

    app.notFound((c) => {
    return c.html(layout('Error', error404Page()), 404);
    });

## Rate Limiting in Login Route
HonoShield includes a rate-limiting mechanism to prevent excessive login attempts from the same IP address. The rate-limiting logic is implemented using Cloudflare KV storage and can be configured to specify the maximum number of allowed attempts within a time window.

### Implementation
The `rateLimit` function is used to enforce rate limiting. It checks if the current IP address exceeds the allowed number of login attempts and, if so, blocks further attempts until the time window resets.

#### Usage in the Login Route
The rate limiter is invoked at the beginning of the login route to enforce limits before processing authentication.

    authRoutes.post('/api/login', async (c) => {
      const isAllowed = await rateLimit(c, 5, 60); // Allows 5 attempts per 60 seconds
    
      if (!isAllowed) {
        return c.json({ message: 'Too many login attempts. Please try again later.' }, 429);
      }
    
      // Proceed with authentication logic...
    });

### How It Works
1.  **IP Address Tracking**:  
    The client’s IP address is extracted from the request headers:
	`const ipAddr = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || c.req.header('Remote-Addr');`
    
2.  **Rate Limiting Logic**:
	-   A unique key is generated for the IP address in the KV store.
    -   The number of attempts and the start time of the rate-limiting window are tracked.
    -   If the number of attempts exceeds the allowed maximum, a `429 Too Many Requests` response is returned.
3.  **Configuration**:  
    The `rateLimit` function accepts two parameters:
    -   `maxRequests`: Maximum allowed attempts within the time window.
    -   `timeWindow`: Duration of the time window in seconds.
4.  **Storage in KV**:  
    Rate-limiting data is stored in Cloudflare KV storage. The data is updated after each attempt, and the record expires automatically after the specified time window.

### Example Configuration
To enforce a rate limit of 5 login attempts per minute:
	`const isAllowed = await rateLimit(c, 5, 60);`

### Key Considerations
*  **Asynchronous Nature**:  
    Ensure the `rateLimit` function is called with `await` to properly handle its asynchronous operations:
    `const isAllowed = await rateLimit(c, 5, 60);`
*  **Error Handling**:  
    The `rateLimit` function returns `false` if the limit is exceeded or if an error occurs while accessing KV storage.
    

### Testing Rate Limiting
1.  Deploy the application:    
    `npx wrangler deploy` 
2.  Send multiple login requests to test rate limiting:
    `curl -X POST https://your-app-url/api/login -d '{"username":"test","password":"test"}'`
3.  Observe the response:
    *  Normal responses return `401 Unauthorized`.
    *  Exceeding the limit returns a `429 Too Many Requests` response.

### Benefits
*  Prevents brute force attacks by limiting repeated login attempts.
*  Uses Cloudflare’s globally distributed KV storage for efficient data management.
*  Customizable rate limits to match application requirements.

This mechanism helps enhance application security by mitigating the risk of automated attacks while maintaining a smooth user experience for legitimate users.

## Asset Compilation with Gulp
This project uses Gulp for managing and optimizing frontend assets such as JavaScript, CSS, and fonts. The configuration for Gulp is defined in `gulpfile.js`, and the following sections outline the setup and usage.

### Features
   * **JavaScript Bundling and Minification**: Combines and compresses JavaScript files into a single `bundle.min.js`.
   * **CSS Concatenation and Minification**: Merges CSS files and minimizes them into `styles.min.css`.
   * **Font Copying**: Copies font files into the appropriate directory for deployment.

### Gulp Tasks
1.  **JavaScript Task**: Combines and minifies JavaScript files from dependencies and custom scripts.
2.  **CSS Task**: Merges and minifies stylesheets, including third-party themes and custom CSS.
3.  **Font Task**: Copies font files (such as those from Bootstrap Icons) to the compiled assets directory.

### File Structure
The following directories are expected in your project:
* **Source Directories**:
	*  `node_modules`: For dependencies such as Bootstrap, Bootswatch, and Bootstrap Icons.
	*  `public/assets/css`: Custom CSS stylesheets.
*  **Output Directories**:
	*  `public/assets/compiled/js`: For the minified JavaScript bundle.
	*  `public/assets/compiled/css`: For the minified CSS bundle.
	*  `public/assets/compiled/css/fonts`: For font files.

### Installation and Setup
1.  **Define Source Files**
Update the arrays in `gulpfile.js` to include your specific JavaScript, CSS, and font file paths if needed.
2.  **Run Gulp Tasks**
    * To run all tasks (JavaScript, CSS, and fonts), execute:
      * `gulp`
    * To run specific tasks:
      * `gulp js`
      * `gulp css`
      * `gulp fonts`
3.  **Customize Output**
Modify the output directories in the `gulp.dest()` calls if your project structure requires different locations.

### Example Integration
After running the Gulp tasks, link the compiled assets in your HTML:
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="stylesheet" href="/assets/compiled/css/styles.min.css">
	</head>
	<body>
		<script src="/assets/compiled/js/bundle.min.js"></script>
	</body>
</html>
```
 
### Notes  
* Ensure the `node_modules` folder is not included in your deployment build if it's not required at runtime.
* The `public/assets/compiled` directory should be added to your `.gitignore` to prevent committing generated files.

## Future Improvements  
*  **Add multi-factor authentication (MFA)** for improved security.
*  **Expand the use of D1 database** for more comprehensive data management.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests.