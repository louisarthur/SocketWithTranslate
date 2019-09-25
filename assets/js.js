$(document).ready(function() {
  var socket = io.connect("http://localhost:3001");
  var ready = false;

  $("#submit").submit(function(e) {
    e.preventDefault();
    $("#nick").fadeOut();
    $("#chat").fadeIn();
    var name = $("#nickname").val();
    var password = $("#password").val();
    ready = true;
    socket.emit("join", name);
  });

  $("#textarea").change(function() {
    var text = $("#textarea").val();
    var origem = $("#idiomaOrig").val();
    var destino = $("#idiomaTran").val();
    socket.emit("send", text, origem, destino);
  });

  socket.on("translate", function(msg) {
    $("#textTranslated").html(msg);
  });
});
