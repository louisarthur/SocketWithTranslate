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

  $("#trad").click(function() {
    var text = $("#textarea").val();
    var origem = $("#idiomaOrig").val();
    var destino = $("#idiomaTran").val();
    var encrypted = CryptoJS.AES.encrypt(text, "agua").toString();
    socket.emit("send", encrypted, origem, destino);
  });

  socket.on("translate", function(msg) {
    var deseencrypt = CryptoJS.AES.decrypt(msg, "cuzcuz").toString(
      CryptoJS.enc.Utf8
    );
    $("#textTranslated").html(deseencrypt);
  });
});
