//require("dotenv/config");
$(document).ready(function() {
  var socket = io.connect("http://localhost:3333");
  var ready = false;
  $("#submit").click(function(e) {
    e.preventDefault();
    $('#containerLogin').fadeOut();
    $("#containerTranslate").fadeIn();
    var name = $("#nickname").val();
    //var pass = $("#password").val();
    //var time = new Date();
    //$("#name").html(name);

    //ready = true;
    //socket.emit("join", name);
  });


  /*
  $("#translate").click(function(e){
    if(e.which == 13) {
      var text = $("#textarea").val();
      $("#textarea").val('');
      var time = new Date();
      $(".chat").append('<li class="self"><div class="msg"><span>' + $("#nickname").val() + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
      
      socket.emit("send", text);
      // automatically scroll down
      document.getElementById('bottom').scrollIntoView();
    }
  });*/

});


