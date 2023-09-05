import io from "socket.io-client";

const socket = io("http://localhost:3002");

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

socket.on("notification", (data) => {
  console.log("HELLO");
});

export default socket;
