import verifySession from "../utils/session";

const loginForm = document.getElementById("login-form");

document.addEventListener("DOMContentLoaded", async () => {
  if (await verifySession()) {
    window.location.href = "/";
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm["email"].value;
  const password = loginForm["password"].value;

  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const response = await fetch("http://localhost:3002/api/auth/login", {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
});
