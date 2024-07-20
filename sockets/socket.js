const { checkJWT } = require("../helpers/jwt");
const { io } = require("../index");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  const [valid, uid] = checkJWT(client.handshake.headers["authorization"]);
  
  if (!valid) return client.disconnect();

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
