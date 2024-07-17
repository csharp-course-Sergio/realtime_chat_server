const { io } = require("../index");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("disconnect", () => {
    console.clear();
    console.log("Cliente desconectado");
  });

  client.on("message", (payload) => {
    console.log("Mensaje", payload);

    io.emit("message", { admin: "Nuevo mensaje" });
  });
});
