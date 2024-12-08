export const activatePage = () => `
<div id="authentication" class="container mt-5">
      <div class="form-left bg-primary border rounded-start">
        <h4 class="text-uppercase">Account Activation</h4>
        <p>Enter the activation key from the email message.</p>
        <p class="fw-light small">Make sure to check your SPAM messages if you haven't received a message in 10 minutes.</p>

        <a href="/auth/register" type="button" class="btn btn-sm btn-light">Create an Account</a>

      </div>
      <form class="form-right border rounded-end" id="activateForm">
            <input type="text" id="secret_key" placeholder="Registration Key" class="form-control mb-2" required />
            <button class="btn btn-primary" type="submit">Activate Account</button>
        
        <div id="liveAlertPlaceholder"></div>
    </form>
    </div>
`;

export const javaScript = (nonce) => `<script nonce="${nonce}">
    async function activate(secret_key) {
    const response = await fetch("/auth/api/activate-user", {
        method: "POST",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({secret_key}),
    credentials: "include",
    });
    return response.json();
  }

    let url= new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    const urlsecretkey = params.get('secret_key');

    if(urlsecretkey) {
        document.getElementById("secret_key").value = urlsecretkey;
    document.getElementById("activateForm").submit();
  }

    document.getElementById("activateForm").addEventListener("submit", async (e) => {
        e.preventDefault();
    const secret_key = document.getElementById("secret_key").value;

    const result = await activate(secret_key);
    
    if (result.message === "User Activated") {
    document.getElementById("message").innerHTML = '<p>User Activated: <a href="/auth/login">Login Now</a>';
    }else {
       document.getElementById("message").innerHTML = '<p>' + result.message + '</p>';
       }
    });
</script>
`;