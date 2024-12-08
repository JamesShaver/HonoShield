async function register(username, password) {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  }
  
  async function login(username, password) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    return response.json();
  }
  
  async function logout() {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    const result = await response.json();
    if (result.message === "Logged out") window.location.href = "/";
  }
  