import socket from "./socket";

const verifySession = async () => {
  if (!document.cookie.includes("token")) {
    return false;
  }

  try {
    const response = await fetch("http://localhost:3002/api/auth/me", {
      method: "GET",
      credentials: "include",
    });
    const { data } = await response.json();

    socket.emit("login", data);

    return true;
  } catch (error) {
    window.location.href = "/src/views/login.html";
  }
};

export default verifySession;
