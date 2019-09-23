require("dotenv/config");
$(document).ready(function() {
  var socket = io.connect(process.env.SOCKET_CONECTION);
  var ready = false;
  $("#submit").submit(function(e) {
    e.preventDefault();
    $("#nick").fadeOut();
    $("#chat").fadeIn();
    var name = $("#nickname").val();
    var time = new Date();
    $("#name").html(name);

    ready = true;
    socket.emit("join", name);
  });
});
