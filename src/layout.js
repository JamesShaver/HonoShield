export const layout = (content) => `<!doctype html>
<html lang="en" class="h-100">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="James Shaver, and HonoShield contributors">
    <title>${content.title}</title>
    <link rel="canonical" href="https://honoshield.cdndev.io/">
    <link href="/assets/compiled/css/styles.min.css" rel="stylesheet" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  </head>
  <body class="d-flex flex-column h-100">
    <header class="p-2 text-bg-primary">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <img src="/assets/images/header_logo.png" alt="HonoShield Logo" height="52" width="40">
              </a>
              <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><a href="/" class="nav-link px-2 text-white">Home</a></li>
                  <li><a href="/contact" class="nav-link px-2 text-white">Contact</a></li>
              </ul>
              <div class="text-end">  
              ${content.username ? `
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
                </div>`
          : `<a href="/auth/login" type="button" class="btn btn-outline-light me-2">Login</a>
              <a href="/auth/register" type="button" class="btn btn-warning">Register</a>`}
            </div>
          </div>
        </div>
    </header>
    <main class="flex-shrink-0">
    ${content.page}
    </main>
    <footer class="mt-auto bg-body-tertiary">
              <div class="d-flex flex-wrap justify-content-between align-items-center my-4 px-2">
          <div class="col-md-4 d-flex align-items-center">
                <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                    <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
                </a>
                <span class="mb-3 mb-md-0 text-body-secondary">HonoShield</span>
            </div>

            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li class="ms-3">
                    <a class="text-body-secondary" href="https://github.com/JamesShaver/HonoShield">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
          </svg>
                    </a>
                </li>
            </ul>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    ${content.javascript}
  </body>
</html>`;