import "dotenv/config";
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const translatte = require("translatte");

app.get("/", function(req, res) {
  res.send("Servidor está funcionando");
});

io.on("connection", function(client) {
  client.on("join", function(name) {
    console.log("Joined: " + name);
    client.emit("update", "You have connected to the system.");
  });
  client.on("send", function(msg) {
    console.log("Message: " + msg);
    translatte(msg, { to: "pt" })
      .then(res => {
        console.log(res.text);
      })
      .catch(err => {
        console.error(err);
      });
  });
});
// test
// translatte("I wanna fuck you", { to: "pt" })
//   .then(res => {
//     console.log(res.text);
//   })
//   .catch(err => {
//     console.error(err);
//   });

const porta = 3333;
http.listen(porta, function() {
  console.log(`Ouvindo na porta ${porta}`);
});
