export const registerPage = (csrfToken) => `
  <div id="authentication" class="container p-5">
  <div class="row">
    <div class="col-12 col-md-6 bg-primary text-white border rounded-start p-3">
        
        <h4 class="text-uppercase">Account Registration</h4>
        <p>Registering a user account on our site comes with several benefits, including easy access to your account information, exclusive promotions and discounts, a faster checkout process, and a personalized experience.</p>
        <p class="pb-5">If you want a more convenient and personalized experience, as well as access to exclusive discounts and promotions, register a user account with us today!</p>

        <a href="/auth/login" type="button" class="btn btn-sm btn-light">Have an Account?</a>

    </div>
    <div class="col bg-white border border-start-0 rounded-end p-3">
      <form id="registerForm">
        <div class="row">
          <div class="col-sm-6 mb-3">
            <div class="form-floating">
              <input type="text" class="form-control" autocomplete="given-name" id="firstName" placeholder="First Name" required="">
              <label for="firstName">First Name</label>
            </div>
          </div>
          <div class="col-sm-6 mb-3">
            <div class="form-floating">
              <input type="text" class="form-control" autocomplete="family-name" id="lastName" placeholder="Last Name" required="">
              <label for="firstName">Last Name</label>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-floating">
            <input type="text" class="form-control" autocomplete="organization-name" id="company" placeholder="company" required="">
            <label for="company">Company</label>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-floating">
            <input type="email" class="form-control" autocomplete="username" id="email" placeholder="name@website.com" required="">
            <label for="email">Email Address</label>
          </div>
        </div><div class="row">
          <div class="col-sm-6 mb-3">
            <div class="input-group">  
              <div class="form-floating">
                <input type="password" class="form-control" autocomplete="current-password" id="password" placeholder="Password" required="">
                <label for="password">Password</label>
              </div>
                <button type="button" class="input-group-text" id="showPass"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
            </svg></button>
            </div>
          </div>
          <div class="col-sm-6 mb-3">
            <div class="input-group">  
            <div class="form-floating">
              <input type="password" class="form-control" autocomplete="current-password" id="confirmPassword" placeholder="Confirm Password" required="">
              <label for="confirmPassword">Confirm Password</label>
            </div>
              <button type="button" class="input-group-text" id="showConfirmPass"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
          </svg></button>
          </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="option">I agree to the <a href="/tos" target="_NEW">Terms and Conditions</a>
            <input type="checkbox" required="">
            <span class="checkmark"></span>
          </label>
        </div>
          <button type="submit" class="btn btn-primary btn-small" name="register">Register</button>
          <div id="liveAlertPlaceholder"></div>
      </form>
    </div>
  </div>
</div>`;

export const javaScript = (csrfToken, nonce) => `<script nonce="${nonce}">

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  if (!type) {
    console.error('Alert type is required');
    return;
  }
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    \`<div class="mt-2 alert alert-\${type} alert-dismissible" role="alert">\`,
    \`   <div>\${message}</div>\`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

async function register(firstname, lastname, company, email, password) {
    const csrfToken = "${csrfToken}";
    const response = await fetch("/auth/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, company, email, password, csrfToken }),
      credentials: "include",
    });
    return response.json();
}

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const company = document.getElementById("company").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirmPassword").value;
  if(password !== confirm_password) {
      appendAlert("Passwords don't match", 'danger');
  } else {
    const result = await register(firstname, lastname, company, email, password);
    appendAlert(result.message, 'danger');
    if (result.message === "User registered") window.location.href = "/auth/activate-user";
  }
});

document.getElementById("showPass").addEventListener("click", function() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>';
  } else {
    x.type = "password";
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>';
  
    }
});
    
  document.getElementById("showConfirmPass").addEventListener("click", function() {
  var x = document.getElementById("confirmPassword");
  if (x.type === "password") {
    x.type = "text";
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>';
  } else {
    x.type = "password";
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>';
  }
});

</script>
`;