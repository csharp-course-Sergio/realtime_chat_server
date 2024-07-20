const { checkJWT } = require("../helpers/jwt");
const { io } = require("../index");
const { connectedUser, disconnectedUser } = require("../controllers/socket");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  const [valid, uid] = checkJWT(client.handshake.headers["authorization"]);

  if (!valid) return client.disconnect();

  connectedUser(uid);

  client.on("disconnect", () => {
    disconnectedUser(uid);
  });
});
