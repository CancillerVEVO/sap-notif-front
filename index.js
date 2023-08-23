import verifySession from "./src/utils/session";

document.addEventListener("DOMContentLoaded", async () => {
  if (!(await verifySession())) {
    window.location.href = "/src/views/login.html";
  }
});

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", async () => {
  try {
    await fetch("http://localhost:3002/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/src/views/login.html";
  } catch (error) {
    console.error(error);
  }
});
