export const dashboardPage = (userRecord) => `
  <section class="container">
<div class="row h-100">
<div class="col col-md-2 pt-4 border-end">
<ul class="nav nav-pills flex-column">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="/profile/dashboard">Dashboard</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/profile/settings">Settings</a>
  </li>
</ul>
</div>
    <div class="col col-md-10">
        <h3>Dashboard Page</h3>
    <div class="card">
    <div class="card-header fw-bold">
      Profile
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Username: ${userRecord.username}</li>
      <li class="list-group-item">Company: ${userRecord.company}</li>
      <li class="list-group-item">Created: ${userRecord.created_on}</li>
    </ul>
  </div>
        
    </div>
</div>    
</section>
`;

export const javaScript = (nonce) => `<script nonce="${nonce}"></script>`;