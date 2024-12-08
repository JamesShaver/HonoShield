import { createHash } from 'crypto';


export const getLoggedInHeader = (username) => {
  if (username != null) {
    return `
    <div class="flex-shrink-0 dropdown">
          <a href="#" class="d-block link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">            
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve">
              <path fill="#CCCCCC" d="M48.35,50.783l0.254,0.305c-4.997,4.488-11.608,7.222-18.842,7.222s-13.833-2.721-18.83-7.196l0.28-0.331
                c0,0,3.293-2.619,7.171-3.585c3.878-0.966,5.632-3.687,5.632-3.687v-4.755c0,0-2.823-3.776-2.428-6.395c0,0-3.496-2.327-1.068-5.721
                c0,0-5.62-16.134,8.633-16.299c3.611-0.038,5.403,2.708,5.403,2.708c9.65-0.966,4.488,13.591,4.488,13.591
                c2.428,3.395-1.068,5.721-1.068,5.721c0.394,2.619-2.428,6.395-2.428,6.395v4.755c0,0,1.755,2.721,5.632,3.687
                C45.057,48.164,48.35,50.783,48.35,50.783z"></path>
              <path fill="none" stroke="#CCCCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="
                M48.35,50.783c0,0-3.293-2.619-7.171-3.585c-3.878-0.966-5.632-3.687-5.632-3.687v-4.755c0,0,2.823-3.776,2.428-6.395
                c0,0,3.496-2.327,1.068-5.721c0,0,5.162-14.558-4.488-13.591c0,0-1.793-2.746-5.403-2.708c-14.253,0.165-8.633,16.299-8.633,16.299
                c-2.428,3.395,1.068,5.721,1.068,5.721c-0.394,2.619,2.428,6.395,2.428,6.395v4.755c0,0-1.755,2.721-5.632,3.687
                c-3.878,0.966-7.171,3.585-7.171,3.585"></path>
              <path fill="none" stroke="#999999" stroke-width="3" stroke-miterlimit="10" d="M10.932,51.113
                C5.16,45.939,1.524,38.425,1.524,30.071c0-15.6,12.638-28.238,28.238-28.238C45.349,1.833,58,14.471,58,30.071
                c0,8.353-3.624,15.854-9.396,21.016c-4.997,4.488-11.608,7.222-18.842,7.222S15.929,55.589,10.932,51.113z"></path>
              </svg>
          </a>
          <ul class="dropdown-menu text-small shadow">
            <li><a class="dropdown-item" href="/profile/dashboard">Dashboard</a></li>
            <li><a class="dropdown-item" href="/profile/settings">Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/auth/logout">Sign out</a></li>
          </ul>
        </div>
    `;
  } else {
    return `
        <a href="/auth/login" type="button" class="btn btn-outline-light me-2">Login</a>
        <a href="/auth/register" type="button" class="btn btn-warning">Register</a>
      `;
  }
};


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