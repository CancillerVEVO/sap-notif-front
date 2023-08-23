const verifySession = async () => {
  if (!document.cookie.includes("token")) {
    return false;
  }

  try {
    await fetch("http://localhost:3002/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    return true;
  } catch (error) {
    window.location.href = "/src/views/login.html";
  }
};

export default verifySession;
