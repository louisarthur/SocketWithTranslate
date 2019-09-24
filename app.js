var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var translatte = require('translatte');

var clients = {}; 

app.get('/', function(req, res){
  res.send('server is running');
});

io.on("connection", function (client) {
    console.log("conectou!");  
    client.on("join", function(name){
    	console.log("Joined: " + name);
        clients[client.id] = name;
        client.emit("update", "You have connected to the server.");
        client.broadcast.emit("update", name + " has joined the server.")
    });

    client.on("send", function(msg, origem, destino){
    	console.log("Message: " + msg + origem + destino);
      translatte(msg, { from: origem, to: destino })
      .then(res => {
        console.log(res.text);
        client.emit("translate", res.text);
      })
      .catch(err => {
        console.error(err);
      });
      
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " has left the server.");
        delete clients[client.id];
    });
});


http.listen(3000, function(){
  console.log('listening on port 3000');
});
