var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var translatte = require("translatte");
var CryptoJS = require("crypto-js");

app.get("/", function(req, res) {
  res.send("server is running");
});

io.on("connection", function(client) {
  console.log("conectou!");
  client.on("join", function(name) {
    console.log("Joined: " + name);
    client.emit("update", "You have connected to the server.");
    client.broadcast.emit("update", name + " has joined the server.");
  });

  client.on("send", function(msg, origem, destino) {
    console.log("Message: " + msg + origem + destino);
    var desencrypt = CryptoJS.AES.decrypt(msg, "agua").toString(
      CryptoJS.enc.Utf8
    );
    console.log(desencrypt);
    translatte(desencrypt, { from: origem, to: destino })
      .then(res => {
        console.log(res.text);
        var encrypt = CryptoJS.AES.encrypt(res.text, "cuzcuz").toString();
        console.log(encrypt);
        client.emit("translate", encrypt);
      })
      .catch(err => {
        console.error(err);
      });
  });

  client.on("disconnect", function() {
    console.log("Disconnect");
    io.emit("update", " has left the server.");
  });
});

http.listen(3001, function() {
  console.log("listening on port 3001");
});
