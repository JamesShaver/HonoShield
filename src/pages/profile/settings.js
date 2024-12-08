export const settingsPage = (userRecord) => `
<section class="container h-100">
  <div class="row h-100">
    <div class="col col-md-2 pt-4 border-end">
      <ul class="nav nav-pills flex-column">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/profile/dashboard">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/profile/settings">Settings</a>
        </li>
      </ul>
    </div>
    <div class="col col-md-10">
      <h3>Settings Page</h3>
      <div class="card">
        <div class="card-header fw-bold"> Profile </div>
        <div class="card-body vstack gap-3">
          <div class="p-2">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#companyModal">Change Company Name</button>
          </div>
          <div class="p-2">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#passwordModal">Change Password</button>
          </div>
          <div class="p-2" id="liveAlertPlaceholder"></div>
        </div>
      </div>
    </div>
  </div>
</section>
<div class="modal fade" id="companyModal" tabindex="-1" aria-labelledby="companyModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form id="changeCompany" class="modal-content">
      <div class="modal-header bg-secondary text-primary">
        <h1 class="modal-title fs-5" id="companyModalLabel">Company Name Change</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="companyModalBody" class="modal-body">
        <div class="mb-3">
          <label for="currentCompany" class="form-label">Current Company</label>
          <input type="text" readonly class="form-control" id="currentCompany" autocomplete="organization" value="${userRecord.company}" required>
        </div>
        <div class="mb-3">
          <label for="newCompany" class="form-label">New Company</label>
          <input type="text" class="form-control" id="newCompany" required>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="companyDoubleCheck" required>
          <label class="form-check-label" for="companyDoubleCheck">Are you sure?</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</div>
<div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form id="changePassword" class="modal-content">
      <div class="modal-header bg-secondary text-primary">
        <h1 class="modal-title fs-5" id="passwordModalLabel">Password Change</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="passwordyModalBody" class="modal-body">
        <div class="form-floating">
          <input type="hidden" class="form-control-plaintext" aria-labelledby="labelUsername" autocomplete="username" id="username" value="${userRecord.username}">
          <label id="labelUsername" class="visually-hidden" for="username">Username</label>
        </div>
        <div class="input-group mb-3">
          <div class="form-floating">
            <input type="password" autocomplete="current-password" class="form-control" id="currentPassword" placeholder="Password" required="">
            <label for="currentPassword">Current Password</label>
          </div>
          <button type="button" class="input-group-text" id="showCurrentPass">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
            </svg>
          </button>
        </div>
        <div class="input-group mb-3">
          <div class="form-floating">
            <input type="password" autocomplete="new-password" class="form-control" id="newPassword" placeholder="Password" required="">
            <label for="newPassword">New Password</label>
          </div>
          <button type="button" class="input-group-text" id="showNewPass">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
            </svg>
          </button>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="passwordDoubleCheck" required>
          <label class="form-check-label" for="passwordDoubleCheck">Are you sure?</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</div>
`;

export const javaScript = (csrfToken,nonce) => `<script nonce="${nonce}">
const csrfToken = "${csrfToken}";    
async function changePassword(currentPassword, newPassword) {
    const response = await fetch("/profile/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword, csrfToken})
    });
    return response.json();
}

async function changeCompany(companyName) {
    const response = await fetch("/profile/api/change-company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyName, csrfToken })
    });
    return response.json();
}

document.getElementById("changeCompany").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newCompany = document.getElementById("newCompany").value;
    const result = await changeCompany(newCompany);
    
    if (result.message === "Company changed")
    {
        return c.redirect('/profile/dashboard');
    } else {
      const node = document.createElement("div");
      node.classList.add("alert","alert-warning","alert-dismissible","fade","show");
      node.innerHTML = result.message;

      const nodebutton = document.createElement("button");
      nodebutton.classList.add("btn-close");
      nodebutton.setAttribute("data-bs-dismiss", "alert");
      nodebutton.setAttribute("type", "button");
      nodebutton.setAttribute("aria-label", "Close");

      node.appendChild(nodebutton);

      document.getElementById("companyModalBody").appendChild(node);
     }
});

document.getElementById("changePassword").addEventListener("submit", async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const result = await changePassword(currentPassword, newPassword);
    
    if (result.message === "Password Changed")
    {
        return c.redirect('/profile/dashboard');
    } else {
      const node = document.createElement("div");
      node.classList.add("alert","alert-warning","alert-dismissible","fade","show");
      node.innerHTML = result.message;

      const nodebutton = document.createElement("button");
      nodebutton.classList.add("btn-close");
      nodebutton.setAttribute("data-bs-dismiss", "alert");
      nodebutton.setAttribute("type", "button");
      nodebutton.setAttribute("aria-label", "Close");

      node.appendChild(nodebutton);

      document.getElementById("passwordyModalBody").appendChild(node);
     }
});

document.getElementById("showCurrentPass").addEventListener("click", function() {
  var x = document.getElementById("currentPassword");
  if (x.type === "password") {
    x.type = "text";
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>';
  } else {
    x.type = "password";
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>';
  }
});
document.getElementById("showNewPass").addEventListener("click", function() {
  var x = document.getElementById("newPassword");
  if (x.type === "password") {
    x.type = "text";
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>';
  } else {
    x.type = "password";
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>';
  }
});
</script>`;